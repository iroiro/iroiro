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

import { log } from "@graphprotocol/graph-ts";
import { Campaign, Creator, Distributor } from "../types/schema";
import { CCTWalletCampaign as CampaignTemplate } from "../types/templates";
import {
  CCTWalletDistributor,
  CreateCampaign,
} from "../types/CCTWalletDistributor/CCTWalletDistributor";
import { CCTWalletCampaign } from "../types/templates/CCTWalletCampaign/CCTWalletCampaign";

export function handleCreateCampaign(event: CreateCampaign): void {
  let distributorId = event.address.toHexString();
  let distributor = Distributor.load(distributorId);
  if (distributor == null) {
    distributor = new Distributor(distributorId);
  }
  let distributorContract = CCTWalletDistributor.bind(event.address);
  let callDistributorCid = distributorContract.try_distributorInfoCid();
  if (callDistributorCid.reverted) {
    log.warning("Distributor cid not found. Campaign: {}", [distributorId]);
  } else {
    distributor.distributorCid = callDistributorCid.value;
  }

  let creatorId = event.params.creator.toHexString();
  let creator = Creator.load(creatorId);
  if (creator == null) {
    creator = new Creator(creatorId);
  }

  let campaignId = event.params.campaign.toHexString();
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }
  campaign.distributor = event.address.toHexString();
  campaign.token = event.params.token.toHexString();
  campaign.creator = event.params.creator.toHexString();

  let campaignContract = CCTWalletCampaign.bind(event.params.campaign);
  let callStartDate = campaignContract.try_startDate();
  if (callStartDate.reverted) {
    log.warning("Start date not found. Campaign: {}", [campaignId]);
  } else {
    campaign.startDate = callStartDate.value;
  }
  let callEndDate = campaignContract.try_endDate();
  if (callEndDate.reverted) {
    log.warning("End date not found. Campaign: {}", [campaignId]);
  } else {
    campaign.endDate = callEndDate.value;
  }
  let callClaimAmount = campaignContract.try_claimAmount();
  if (callClaimAmount.reverted) {
    log.warning("Claim amount not found. Campaign: {}", [campaignId]);
  } else {
    campaign.claimAmount = callClaimAmount.value;
  }
  let callClaimedNum = campaignContract.try_claimedNum();
  if (callClaimedNum.reverted) {
    log.warning("Claimed num not found. Campaign: {}", [campaignId]);
  } else {
    campaign.claimedNum = callClaimedNum.value;
  }
  let callCampaignInfoCid = campaignContract.try_campaignInfoCid();
  if (callCampaignInfoCid.reverted) {
    log.warning("Campaign info cid not found. Campaign: {}", [campaignId]);
  } else {
    campaign.campaignInfoCid = callCampaignInfoCid.value;
  }
  let callRecipientsCid = campaignContract.try_recipientsCid();
  if (callRecipientsCid.reverted) {
    log.warning("Recipients cid not found. Campaign: {}", [campaignId]);
  } else {
    campaign.recipientsCid = callRecipientsCid.value;
  }
  let callStatus = campaignContract.try_status();
  if (callStatus.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    campaign.status = callStatus.value;
  }

  campaign.save();
  distributor.save();
  creator.save();

  CampaignTemplate.create(event.params.campaign);
}
