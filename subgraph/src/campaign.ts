import { Claim, Campaign } from "./types/schema";
import {
  AudiusFollowersCampaign,
  Claim as ClaimEvent,
  UpdateStatus,
} from "./types/templates/AudiusFollowersCampaign/AudiusFollowersCampaign";
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
  let campaignContract = AudiusFollowersCampaign.bind(event.address);
  let callClaimAmount = campaignContract.try_claimAmount();
  if (callClaimAmount.reverted) {
    log.warning("Claim amount not found. Campaign: {}", [campaignId]);
  } else {
    claim.amount = callClaimAmount.value;
  }

  claim.save();
}

export function handleUpdateStatus(event: UpdateStatus): void {
  let campaignId = event.address.toHexString();
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }

  let campaignContract = AudiusFollowersCampaign.bind(event.address);
  let callStatus = campaignContract.try_status();
  if (callStatus.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    campaign.status = callStatus.value;
  }

  campaign.save();
}
