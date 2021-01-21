import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { S3 } from "aws-sdk";

const s3 = new S3();

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // TODO error handling
  // @ts-ignore
  const cid = event["cid"];
  // @ts-ignore
  const key = event["key"];

  const merkleTreeBucket = process.env.MERKLE_TREE_BUCKET;
  const params: S3.Types.GetObjectRequest = {
    Bucket: merkleTreeBucket,
    Key: key,
  };
  console.debug("key", key);

  const merkleTree = await s3
    .getObject(params)
    .promise()
    .then((data) => {
      return JSON.parse(data.Body.toString());
    })
    .catch((err) => {
      console.error("Error calling S3 getObject:", err);
    });

  // TODO error handling
  const merkleProofBucket = process.env.MERKLE_PROOF_BUCKET;
  if (!merkleProofBucket) {
    // TODO error handling
    return;
  }
  await Promise.all(
    Object.entries(merkleTree.claims).map(async ([address, proof]) => {
      const merkleTreeKey = `${cid}/${address.toLowerCase()}.json`;
      const putObjectParams: S3.Types.PutObjectRequest = {
        Bucket: merkleProofBucket,
        Key: merkleTreeKey,
        Body: JSON.stringify(proof),
      };
      return s3
        .putObject(putObjectParams)
        .promise()
        .then((result) => {
          console.info(result);
        })
        .catch((err) => {
          console.error(err);
        });
    })
  );

  // TODO error handling if upload failed

  return {
    cid,
    merkleRoot: merkleTree.merkleRoot,
  };
};
