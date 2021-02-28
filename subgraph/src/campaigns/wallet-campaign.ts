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

import { Claim, Campaign, Account } from "../types/schema";
import {
  WalletCampaign,
  Claim as ClaimEvent,
  UpdateStatus,
} from "../types/templates/WalletCampaign/WalletCampaign";
import { log } from "@graphprotocol/graph-ts/index";

export function handleClaim(event: ClaimEvent): void {
  let accountId = event.transaction.from.toHexString();
  let campaignId = event.transaction.to.toHexString();
  let claimId = accountId.concat("-").concat(campaignId);
  let claim = Claim.load(claimId);
  if (claim == null) {
    claim = new Claim(claimId);
  }

  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
  }

  claim.account = event.params.to.toHexString();
  claim.campaign = event.address.toHexString();
  let campaignContract = WalletCampaign.bind(event.address);

  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }
  let claimedNum = campaignContract.try_claimedNum();
  if (claimedNum.reverted) {
    log.warning("Claimed num not found. Campaign: {}", [campaignId]);
  } else {
    campaign.claimedNum = claimedNum.value;
  }

  let callToken = campaignContract.try_token();
  if (callToken.reverted) {
    log.warning("Token not found. Campaign: {}", [campaignId]);
  } else {
    claim.token = callToken.value.toHexString();
  }
  let callClaimAmount = campaignContract.try_claimAmount();
  if (callClaimAmount.reverted) {
    log.warning("Claim amount not found. Campaign: {}", [campaignId]);
  } else {
    claim.amount = callClaimAmount.value;
  }

  campaign.save();
  account.save();
  claim.save();
}

export function handleUpdateStatus(event: UpdateStatus): void {
  let campaignId = event.address.toHexString();
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }

  let campaignContract = WalletCampaign.bind(event.address);
  let callStatus = campaignContract.try_status();
  if (callStatus.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    campaign.status = callStatus.value;
  }

  campaign.save();
}
