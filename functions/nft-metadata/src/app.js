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

const ipfsClient = require("ipfs-http-client");
const Web3 = require("web3");
const fetch = require("node-fetch");

let response;

const networks = {
  // mainnet: {},
  rinkeby: {
    provider: process.env.RINKEBY_HTTP_PROVIDER,
    uuid: "0x5b0CE8D5A4B24deFba71992E233BA94e8F308eF9",
    wallet: "0x43D922A226Fc46400Ea7DE3AB83AE0D7C07988F6",
  },
  kovan: {
    provider: process.env.KOVAN_HTTP_PROVIDER,
    uuid: "0x9BaeDB90b0B938731b74B8ba9efFA9C8142B1d80",
    wallet: "0x931155Dd49192CdA6cA6Fcc72E44b470a02b81CB",
  },
  // xdai: {},
  // matic: {},
  // bsc: {},
};

const buildExternalURL = (network, distributorAddress, tokenId) =>
  `https://${
    network === "mainnet" ? "app" : network
  }.iroiro.social/#/explore/nft/distributors/${distributorAddress}/campaigns/${tokenId}`;

const WalletDistributorContract = require("./build/contracts/WalletNFTDistributor.json");
const UUIDDistributorContract = require("./build/contracts/UUIDNFTDistributor.json");
const walletDistributorInterface = WalletDistributorContract.abi;
const uuidDistributorInterface = UUIDDistributorContract.abi;
const ipfs = ipfsClient("https://gateway.pinata.cloud/");

exports.handler = async (event, context) => {
  console.debug("Path parameters: ", event.pathParameters);
  const tokenId = event.pathParameters.tokenId;
  const network = event.pathParameters.network;
  const distributor = event.pathParameters.distributor;
  const networkInfo = networks[network];
  if (networkInfo === undefined) {
    console.log("No network found. Given network: ", network);
    response = {
      statusCode: 401,
      body: JSON.stringify({
        error: "Invalid network",
      }),
    };
    return response;
  }
  const provider = networkInfo.provider;
  const distributorAddress = networkInfo[distributor];
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));

  let metadataCid;
  try {
    const contract = new web3.eth.Contract(
      distributor === "wallet"
        ? walletDistributorInterface
        : uuidDistributorInterface,
      distributorAddress
    );
    const events = await contract.getPastEvents("CreateCampaign", {
      filter: { treeId: tokenId },
      fromBlock: 0,
    });
    console.log("Found events: ", events);
    if (events === undefined || events.length !== 1) {
      throw new Error("Event is not exists.");
    }
    metadataCid = events[0].returnValues.nftMetadataCid;
  } catch (error) {
    console.error("Failed to get event.", error);
    response = { statusCode: 404 };
    return response;
  }

  let metadata;
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${metadataCid}`;
    console.log("IPFS URL:", url);
    const response = await fetch(url);
    console.log("IPFS response: ", response);
    metadata = await response.json();
    metadata.external_url = buildExternalURL(
      network,
      distributorAddress,
      tokenId
    );
    console.log("metadata: ", metadata);
  } catch (error) {
    console.error("Failed to get metadata.", error);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to get metadata.",
      }),
    };
    return response;
  }

  response = {
    statusCode: 200,
    body: JSON.stringify(metadata),
  };
  return response;
};

const getFile = async (cid) => {
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
