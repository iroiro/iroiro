import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { OldFormat } from "@iroiro/merkle-distributor";
import { isAddress } from "web3-utils";
import * as FormData from "form-data";
import * as stream from "stream";
import axios, { AxiosRequestConfig } from "axios";

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

// TODO Remove and use uploaders function

export interface PinFileResult {
  readonly IpfsHash: string;
}

export const uploadFile = async (
  file: stream.Readable | string,
  filename: string
): Promise<PinFileResult | undefined> => {
  const form = new FormData();
  form.append("file", file, {
    filename,
  });

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const config: AxiosRequestConfig = {
    method: "post",
    url: url,
    maxBodyLength: Infinity,
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      ...form.getHeaders(),
    },
    data: form,
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
