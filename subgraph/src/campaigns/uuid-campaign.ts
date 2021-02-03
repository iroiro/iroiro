import { Claim, Campaign } from "../types/schema";
import {
  UUIDCampaign,
  Claim as ClaimEvent,
  UpdateStatus,
} from "../types/templates/UUIDCampaign/UUIDCampaign";
import { log } from "@graphprotocol/graph-ts/index";

export function handleClaim(event: ClaimEvent): void {
  let accountId = event.transaction.from.toHexString();
  let campaignId = event.transaction.to.toHexString();
  let claimId = accountId.concat("-").concat(campaignId);
  let claim = Claim.load(claimId);
  if (claim == null) {
    claim = new Claim(claimId);
  }

  claim.account = event.params.to.toHexString();
  claim.campaign = event.address.toHexString();
  let campaignContract = UUIDCampaign.bind(event.address);

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
  claim.save();
}

export function handleUpdateStatus(event: UpdateStatus): void {
  let campaignId = event.address.toHexString();
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }

  let campaignContract = UUIDCampaign.bind(event.address);
  let callStatus = campaignContract.try_status();
  if (callStatus.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    campaign.status = callStatus.value;
  }

  campaign.save();
}
