import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import {
  parseBalanceMap,
  MerkleDistributorInfo,
  OldFormat,
} from "@iroiro/merkle-distributor";
import { S3 } from "aws-sdk";
const s3 = new S3();
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient("https://gateway.pinata.cloud/");

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // @ts-ignore
  const inputCid = event["cid"];

  // error handling
  const input = (await getFile(inputCid)) as OldFormat;

  const merkleTree: MerkleDistributorInfo = parseBalanceMap(input);

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

  return {
    bucket: merkleTreeBucket,
    key: merkleTreeKey,
  };
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
