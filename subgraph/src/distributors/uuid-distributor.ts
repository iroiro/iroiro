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
  UUIDDistributor,
  CreateCampaign,
  Claimed as ClaimedEvent,
  UpdateDistributorInfo,
} from "../types/UUIDDistributor/UUIDDistributor";

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
  let distributorContract = UUIDDistributor.bind(distributorId);

  let creatorId = event.params.creator.toHexString();
  let creator = Creator.load(creatorId);
  if (creator == null) {
    creator = new Creator(creatorId);
  }

  let campaignId = distributorId
    .toHexString()
    .concat("-")
    .concat(event.params.distributionId.toString());
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }
  campaign.distributor = event.address.toHexString();
  campaign.token = event.params.token.toHexString();
  campaign.creator = event.params.creator.toHexString();
  campaign.claimedNum = new BigInt(0);
  campaign.campaignInfoCid = event.params.campaignInfoCid;
  campaign.merkleTreeCid = event.params.merkleTreeCid;
  campaign.createdAt = event.block.timestamp;
  let merkleRoot = distributorContract.try_merkleRoot(
    event.params.distributionId
  );
  if (merkleRoot.reverted) {
    log.warning("Merkle root not found. Campaign: {}", [campaignId]);
  } else {
    campaign.merkleRoot = merkleRoot.value;
  }

  campaign.save();
  creator.save();
}

export function handleClaimed(event: ClaimedEvent): void {
  let accountId = event.params.account.toHexString();
  let distributorId = event.transaction.to.toHexString();
  let distributionId = event.params.distributionId;
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
  claim.campaign = campaignId;
  let distributorContract = UUIDDistributor.bind(event.address);
  let callToken = distributorContract.try_token(distributionId);
  if (callToken.reverted) {
    log.warning("Token not found. Campaign: {}", [campaignId.toString()]);
  } else {
    claim.token = callToken.value.toHexString();
  }
  claim.amount = event.params.amount;
  claim.createdAt = event.block.timestamp;

  campaign.save();
  account.save();
  claim.save();
}
