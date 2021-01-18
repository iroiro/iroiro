import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import {
  parseBalanceMap,
  MerkleDistributorInfo,
} from "@iroiro/merkle-distributor/src/parse-balance-map";

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // if type is not address, return error

  // if targets contain non-address value, return error

  // TODO: just for test. remove and use S3 ARN after this.
  const input = {
    "0x4B8619890fa9C3cF11C497961eB4b970D440127F": 100,
    "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8": 100,
  };

  const merkleTree: MerkleDistributorInfo = parseBalanceMap(input);
  console.debug(merkleTree);

  // Upload merkle tree to S3

  // Get upload objects ARN

  return {
    // return object ARN
  };
};
