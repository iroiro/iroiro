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
import { getFile } from "../../generate-merkle-tree-input/src/app";
const s3 = new S3();

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

  // unpin used input cid

  return {
    bucket: merkleTreeBucket,
    key: merkleTreeKey,
  };
};
