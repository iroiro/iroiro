/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import { APIGatewayProxyEvent } from "aws-lambda";
import { isAddress } from "web3-utils";
import * as FormData from "form-data";
import * as stream from "stream";
import axios, { AxiosRequestConfig } from "axios";
import { ethers } from "ethers";
import {
  BalanceMapOldFormat,
  StringBalanceMapOldFormat,
} from "@iroiro/merkle-distributor";

const ipfsClient = require("ipfs-http-client");

type TargetType = "address" | "keccak256";

interface Targets {
  readonly targets: string[];
  readonly type: TargetType;
}

interface Output {
  readonly cid: string;
  readonly type: TargetType;
}

const ipfs = ipfsClient("https://gateway.pinata.cloud/");

exports.lambdaHandler = async (event: APIGatewayProxyEvent) => {
  // @ts-ignore
  const cid: string = event["cid"];

  // TODO treat string amount
  // @ts-ignore
  const amount: number = event["amount"];

  // get amount from both of number or string
  if (!amount || amount < 0) {
    throw Error(`amount is invalid. passed: ${amount}`);
  }

  // TODO error handling
  const targets = (await getFile(cid)) as Targets;
  if (!isValidTargets(targets)) {
    throw Error("given file is invalid.");
  }

  const input: BalanceMapOldFormat | StringBalanceMapOldFormat = {};
  targets.targets
    .map((target) => target.toLowerCase())
    .forEach((target) => {
      input[target] = amount;
    });

  // TODO error handling
  const result = await uploadFile(JSON.stringify(input), "input.json");

  const output: Output = {
    cid: result.IpfsHash,
    type: targets.type,
  };
  return output;
};

const isAllAddress = (targets: Targets): boolean => {
  return (
    targets.targets.find((address) => {
      return !isAddress(address);
    }) === undefined
  );
};

const isAllHashed = (targets: Targets): boolean => {
  return (
    targets.targets.find((hashed) => {
      if (hashed.length != 66) {
        return true;
      }
      if (!ethers.utils.isHexString(hashed)) {
        return true;
      }
      return false;
    }) === undefined
  );
};

function isValidTargets(targets: Targets): boolean {
  if (!Array.isArray(targets.targets)) {
    return false;
  }

  switch (targets.type) {
    case "address":
      return isAllAddress(targets);
    case "keccak256":
      return isAllHashed(targets);
    default:
      return false;
  }
}

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
