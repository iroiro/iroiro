import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { OldFormat } from "@iroiro/merkle-distributor/src/parse-balance-map";
import { isAddress } from "web3-utils";
import { S3 } from "aws-sdk";
import { uploadFile } from "../../uploader/src/app";

const s3 = new S3();

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
  // @ts-ignore
  const cid: string = event["cid"];
  // @ts-ignore
  const amount: number | string = event["amount"];
  // get amount from both of number or string
  if (!amount || amount < 0) {
    // TODO throw error
  }

  // TODO error handling
  const targets = (await getFile(cid)) as Targets;
  if (targets.type !== "address") {
    // TODO throw error
  }

  // if targets contain non-address value, return error
  if (!isAllAddress(targets)) {
    // TODO throw error
  }

  const input: OldFormat = {};
  targets.targets
    .map((target) => target.toLowerCase())
    .forEach((target) => {
      input[target] = amount;
    });

  // TODO error handling
  const result = await uploadFile(JSON.stringify(input), "input.json");

  return {
    cid: result.IpfsHash,
  };
};

const isAllAddress = (targets: Targets): boolean => {
  return (
    targets.targets.find((address) => {
      return !isAddress(address);
    }) === undefined
  );
};

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
