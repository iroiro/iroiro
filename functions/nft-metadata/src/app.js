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
const ipfsPath = "https://cloudflare-ipfs.com/ipfs/";

let response;

const networks = {
  // mainnet: {},
  rinkeby: {
    provider: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x2c4C3b79De238553C56D71Aeb139C45bd340541B",
    wallet: "0x5beB5460A47260690B46dC6d089cf668245E5C71",
  },
  kovan: {
    provider: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x248B013528D357F3a1b7a36b01a491d5A2D53858",
    wallet: "0x24B76ECE6ab21a3786efB8E0F2d79153a94C2155",
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
    metadata.image = metadata.image.replace("ipfs://", ipfsPath);
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
