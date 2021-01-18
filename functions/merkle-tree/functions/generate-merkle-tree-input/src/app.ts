import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import {
  parseBalanceMap,
  MerkleDistributorInfo,
  OldFormat,
} from "@iroiro/merkle-distributor/src/parse-balance-map";

interface Targets {
  readonly targets: string[];
  readonly type: string;
}

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  const cid = "";

  // TODO get targets

  const targets: Targets = {
    targets: [
      "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
      "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8",
    ],
    type: "address",
  };

  // if type is not address, return error
  if (targets.type !== "address") {
    return;
  }

  // if targets contain non-address value, return error
  const amount = 100;

  const input: OldFormat = {};
  targets.targets.forEach((target) => {
    input[target] = amount;
  });
  console.debug(input);

  // Upload merkle tree input to S3

  // Get upload objects ARN

  return {
    // return object ARN
  };
};
