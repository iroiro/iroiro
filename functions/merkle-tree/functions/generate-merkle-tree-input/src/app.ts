import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { OldFormat } from "@iroiro/merkle-distributor/src/parse-balance-map";
import { isAddress } from "web3-utils";
import { S3 } from "aws-sdk";

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
  const targets: Targets = await getFile(cid);
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

  // Upload merkle tree input to S3
  const merkleTreeBucket = process.env.INPUT_BUCKET;
  console.log(merkleTreeBucket);
  // TODO Get merkle tree cid
  const merkleTreeInputKey = "input.json";
  // Upload merkle tree to S3
  const putObjectParams = {
    Bucket: merkleTreeBucket,
    Key: merkleTreeInputKey,
    Body: JSON.stringify(input),
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
    key: merkleTreeInputKey,
  };
};

const isAllAddress = (targets: Targets): boolean => {
  return (
    targets.targets.find((address) => {
      return !isAddress(address);
    }) === undefined
  );
};

export const getFile = async (cid: string): Promise<Targets> => {
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
