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
  mainnet: {
    provider: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x1807201aE03F634fBDB7898B4fFFF83d6DCB312E",
    wallet: "0xB7c936b9A43844E4D7918FDc794c3078D432ba5a",
  },
  rinkeby: {
    provider: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x907B024D3E2493c224d4dCe7a3Bb578A46c5af7C",
    wallet: "0xfb879fB06D3ebFA497c2897Dfd17a2078b50E442",
  },
  kovan: {
    provider: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x49f5C75184948dADa55e3Dc4cb354ea0775e0dbF",
    wallet: "0xF455C338cecBC0fEe3E131B2Cfb04A76DBB79D88",
  },
  xdai: {
    provider: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    uuid: "0x9c9a4EDB9A8aB310269B78856c866461Cf4264C6",
    wallet: "0xd3B5E45C14aaAc2367a0318B6c5546477d92b7C8",
  },
  matic: {
    provider: `https://rpc-mainnet.maticvigil.com/v1/${process.env.MATIC_APP_ID}`,
    uuid: "0x68ACb2e9D5eC2E66168D36eF65f8469ddB333fb4",
    wallet: "0xfE64535210089fBCA0e1f9DF6E3b42F8edd17174",
  },
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
