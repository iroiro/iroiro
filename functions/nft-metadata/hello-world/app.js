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
let response;

const WalletDistributorContract = require("./build/contracts/WalletNFTDistributor.json");
const UUIDDistributorContract = require("./build/contracts/UUIDNFTDistributor.json");
const walletDistributorInterface = WalletDistributorContract.abi;
const uuidDistributorInterface = UUIDDistributorContract.abi;
const walletDistributorAddress = process.env.WALLET_NFT_DISTRIBUTOR_ADDRESS;
const uuidDistributorAddress = process.env.UUID_NFT_DISTRIBUTOR_ADDRESS;
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER)
);

const ipfs = ipfsClient("https://gateway.pinata.cloud/");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.debug("request body: ", body);
  const treeId = body.treeId;
  const distributorAddress = body.distributorAddress;

  let metadataCid;
  try {
    const distributor = new web3.eth.Contract(
      distributorAddress.toLowerCase() ===
      walletDistributorAddress.toLowerCase()
        ? walletDistributorInterface
        : uuidDistributorInterface,
      distributorAddress
    );
    const events = await distributor.getPastEvents("CreateCampaign", {
      filter: { treeId },
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
    metadata = await getFile(metadataCid);
  } catch (error) {
    console.error("Failed to get user addresses file. ", error);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to get user addresses file.",
      }),
    };
    return response;
  }

  response = {
    statusCode: 200,
    body: metadata,
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
