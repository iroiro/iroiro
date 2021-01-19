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
  // TODO get cid from input

  const cid = "QmNvbpz6i5FymwMpoTi2e5HJGmFP6WarKTrpzNzY26BTd5";
  // TODO activate
  // const targets = await getFile(cid);
  const targets = {
    targets: [
      "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
      "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8",
      "0x9668a1605Be15b66181d6C4cAD20D4c3Ee0DBDb1",
    ],
    type: "address",
  };
  console.log(targets);

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
