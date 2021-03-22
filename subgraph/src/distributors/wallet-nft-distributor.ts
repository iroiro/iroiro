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

import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  Account,
  Campaign,
  Claim,
  Creator,
  Distributor,
} from "../types/schema";
import {
  WalletNFTDistributor,
  CreateCampaign,
  TransferSingle,
  UpdateDistributorInfo,
} from "../types/WalletNFTDistributor/WalletNFTDistributor";

export function handleUpdateDistributorInfo(
  event: UpdateDistributorInfo
): void {
  let distributorId = event.address.toHexString();
  let distributor = Distributor.load(distributorId);
  if (distributor == null) {
    distributor = new Distributor(distributorId);
  }
  distributor.distributorInfoCid = event.params.cid;

  distributor.save();
}

export function handleCreateCampaign(event: CreateCampaign): void {
  let distributorId = event.address;
  let distributorContract = WalletNFTDistributor.bind(distributorId);

  let creatorId = event.params.creator.toHexString();
  let creator = Creator.load(creatorId);
  if (creator == null) {
    creator = new Creator(creatorId);
  }

  let campaignId = distributorId
    .toHexString()
    .concat("-")
    .concat(event.params.treeId.toString());
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }
  campaign.distributor = event.address.toHexString();
  campaign.creator = event.params.creator.toHexString();
  campaign.claimedNum = new BigInt(0);
  campaign.campaignInfoCid = event.params.campaignInfoCid;
  campaign.merkleTreeCid = event.params.merkleTreeCid;
  let merkleRoot = distributorContract.try_merkleRoot(event.params.treeId);
  if (merkleRoot.reverted) {
    log.warning("Merkle root not found. Campaign: {}", [campaignId]);
  } else {
    campaign.merkleRoot = merkleRoot.value;
  }

  campaign.save();
  creator.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let from = event.params.from.toHexString();

  // TODO for testing. remove
  log.warning("From address: {}", [from]);

  if (from != "0x0000000000000000000000000000000000000000") {
    return;
  }

  let accountId = event.params.to.toHexString();
  let distributorId = event.transaction.to.toHexString();
  let distributionId = event.params.id;
  let campaignId = distributorId.concat("-").concat(distributionId.toString());
  let claimId = campaignId.concat("-").concat(accountId);
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
  }
  let campaign = Campaign.load(campaignId.toString());
  if (campaign == null) {
    campaign = new Campaign(campaignId.toString());
  }
  let claimedNum = campaign.claimedNum;
  campaign.claimedNum = claimedNum.plus(BigInt.fromI32(1));

  let claim = Claim.load(claimId);
  if (claim == null) {
    claim = new Claim(claimId);
  }
  claim.account = accountId;
  claim.campaign = event.params.id.toString();
  claim.nft = distributionId.toString();
  claim.amount = event.params.value;

  campaign.save();
  account.save();
  claim.save();
}
