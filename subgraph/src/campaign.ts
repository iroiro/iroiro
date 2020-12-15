import { Claim, Campaign, CheckRequest, Account } from "./types/schema";
import {
  CustomAddressesCampaign,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  Claim as ClaimEvent,
  UpdateStatus,
} from "./types/templates/CustomAddressesCampaign/CustomAddressesCampaign";
import { Address, log } from "@graphprotocol/graph-ts/index";

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
  let campaignContract = CustomAddressesCampaign.bind(event.address);
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

  claim.save();
}

export function handleUpdateStatus(event: UpdateStatus): void {
  let campaignId = event.address.toHexString();
  let campaign = Campaign.load(campaignId);
  if (campaign == null) {
    campaign = new Campaign(campaignId);
  }

  let campaignContract = CustomAddressesCampaign.bind(event.address);
  let callStatus = campaignContract.try_status();
  if (callStatus.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    campaign.status = callStatus.value;
  }

  campaign.save();
}

export function handleChainlinkRequested(event: ChainlinkRequested): void {
  let campaignId = event.address.toHexString();
  let requestId = event.params.id.toHexString();
  let checkRequestId = campaignId.concat("-").concat(requestId);
  let checkRequest = CheckRequest.load(checkRequestId);
  if (checkRequest == null) {
    checkRequest = new CheckRequest(checkRequestId);
  }

  let accountId = event.transaction.from.toHexString();
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
  }
  account.save();

  checkRequest.account = event.transaction.from.toHexString();
  checkRequest.campaign = event.address.toHexString();
  checkRequest.status = "IN_PROGRESS";
  checkRequest.save();
}

export function handleChainlinkFulfilled(event: ChainlinkFulfilled): void {
  let campaignId = event.address.toHexString();
  let requestId = event.params.id.toHexString();
  let checkRequestId = campaignId.concat("-").concat(requestId);
  let checkRequest = CheckRequest.load(checkRequestId);
  if (checkRequest == null) {
    checkRequest = new CheckRequest(checkRequestId);
  }
  checkRequest.status = "FULFILLED";

  let campaignContract = CustomAddressesCampaign.bind(event.address);
  let callIsClaimable = campaignContract.try_isClaimable(
    Address.fromString(checkRequest.account)
  );
  if (callIsClaimable.reverted) {
    log.warning("Status not found. Campaign: {}", [campaignId]);
  } else {
    checkRequest.result = callIsClaimable.value;
  }

  checkRequest.save();
}

export function handleChanlinkCancelled(event: ChainlinkCancelled): void {
  let campaignId = event.address.toHexString();
  let requestId = event.params.id.toHexString();
  let checkRequestId = campaignId.concat("-").concat(requestId);
  let checkRequest = CheckRequest.load(checkRequestId);
  if (checkRequest == null) {
    checkRequest = new CheckRequest(checkRequestId);
  }
  checkRequest.status = "CANCELLED";
  checkRequest.save();
}
