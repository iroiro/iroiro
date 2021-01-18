import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { OldFormat } from "@iroiro/merkle-distributor/src/parse-balance-map";
import web3 from "web3";

const ipfsClient = require("ipfs-http-client");

interface Targets {
  readonly targets: string[];
  readonly type: string;
}

const ipfs = ipfsClient("https://gateway.pinata.cloud/");

exports.lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
) => {
  // get cid from input

  const cid = "QmNvbpz6i5FymwMpoTi2e5HJGmFP6WarKTrpzNzY26BTd5";
  const targets = await getFile(cid);

  if (targets.type !== "address") {
    // TODO throw error
  }

  // if targets contain non-address value, return error
  if (!isAllAddress(targets)) {
    // TODO throw error
  }

  // get amount from input
  // get amount from both of number or string
  const amount = 100;
  if (!amount || amount < 0) {
    // TODO throw error
  }

  const input: OldFormat = {};
  targets.targets
    .map((target) => target.toLowerCase())
    .forEach((target) => {
      input[target] = amount;
    });
  console.debug(input);

  // Upload merkle tree input to S3

  // Get upload objects ARN

  return {
    // return object ARN
  };
};

const isAllAddress = (targets: Targets): boolean => {
  return (
    targets.targets.find((address) => {
      return !web3.utils.isAddress(address);
    }) === undefined
  );
};

const getFile = async (cid: string): Promise<Targets> => {
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
