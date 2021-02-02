import {
  parseBalanceMap,
  MerkleDistributorInfo,
  BalanceMapOldFormat,
  StringBalanceMapOldFormat,
} from "@iroiro/merkle-distributor";
import { S3 } from "aws-sdk";
import { parseStringBalanceMap } from "@iroiro/merkle-distributor/dist/parse-string-balance-map";
const s3 = new S3();
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient("https://gateway.pinata.cloud/");

type TargetType = "address" | "keccak256";

interface Input {
  readonly cid: string;
  readonly type: TargetType;
}

interface Output {
  readonly bucket: string;
  readonly key: string;
}

exports.lambdaHandler = async (event: Input) => {
  const inputCid: string = event["cid"];
  const type: TargetType = event["type"];

  let merkleTree: MerkleDistributorInfo;
  switch (type) {
    case "address":
      // error handling
      const balanceMap = (await getFile(inputCid)) as BalanceMapOldFormat;
      merkleTree = parseBalanceMap(balanceMap);
      break;
    case "keccak256":
      // error handling
      const stringBalanceMap = (await getFile(
        inputCid
      )) as StringBalanceMapOldFormat;
      merkleTree = parseStringBalanceMap(stringBalanceMap);
      break;
    default:
      throw Error("Unexpected type.");
  }

  const merkleTreeBucket = process.env.MERKLE_TREE_BUCKET;
  const merkleRoot = merkleTree.merkleRoot;
  const merkleTreeKey = merkleRoot + ".json";
  // Upload merkle tree to S3
  const putObjectParams = {
    Bucket: merkleTreeBucket,
    Key: merkleTreeKey,
    Body: JSON.stringify(merkleTree),
  };
  await s3
    .putObject(putObjectParams)
    .promise()
    .then((result) => {
      console.info(result);
    })
    .catch((err) => {
      console.error(err);
    });

  const output: Output = {
    bucket: merkleTreeBucket,
    key: merkleTreeKey,
  };
  return output;
};

// TODO integrate with input-generator
export const getFile = async (cid: string): Promise<object> => {
  for await (const file of ipfs.get(cid)) {
    if (!file.content) {
      continue;
    }
    const content = [];
    for await (const chunk of file.content) {
      content.push(chunk);
    }
    return JSON.parse(content.toString());
  }
};
