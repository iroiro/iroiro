import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
// import {
//   parseBalanceMap,
//   MerkleDistributorInfo,
// } from "@iroiro/merkle-distributor/src/parse-balance-map";
import { S3 } from "aws-sdk";
const s3 = new S3();

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // TODO get arn from input

  const inputBucket = process.env.INPUT_BUCKET;
  const params: S3.Types.GetObjectRequest = {
    Bucket: inputBucket,
    Key: "developeraddresses.json",
  };
  await s3
    .getObject(params)
    .promise()
    .then((data) => {
      console.info(data.Body.toString());
    })
    .catch((err) => {
      console.error("Error getting object", err);
    });

  // TODO enable
  // const merkleTree: MerkleDistributorInfo = parseBalanceMap(input);
  // console.debug(merkleTree);

  // Upload merkle tree to S3

  // Get upload objects ARN

  return {
    // return object ARN
  };
};
