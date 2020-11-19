import {log} from "@graphprotocol/graph-ts";
import {Campaign, Creator, Distributer} from "./types/schema";
import {CreateCampaign} from "./types/AudiusFollowersDistributer/AudiusFollowersDistributer";

export function handleCreateCampaign(event: CreateCampaign): void {
    let distributerId = event.address.toHexString()
    let distributer = Distributer.load(distributerId)
    if (distributer == null) {
        distributer = new Distributer(distributerId)
    }
    distributer.save()

    let creatorId = event.params.creator.toHexString()
    let creator = Creator.load(creatorId)
    if (creator == null) {
        creator = new Creator(creatorId)
    }
    creator.save()

    let campaignId = event.params.campaign.toHexString()
    let campaign = Campaign.load(campaignId)
    if (campaign == null) {
        campaign = new Campaign(campaignId)
    }
    campaign.distributer = event.address.toHexString()
    campaign.token = event.params.token.toHexString()
    campaign.creator = event.params.creator.toHexString()

    let campaignContract = Campaign.bind(event.params.campaign)
    let callStartDate = campaignContract.try_startDate()
    if (callStartDate.reverted) {
        log.warning("Start date not found. Campaign: {}", [campaignId])
    } else {
        campaign.endDate = callStartDate.value
    }
    let callEndDate = campaignContract.try_endDate()
    if (callEndDate.reverted) {
        log.warning("End date not found. Campaign: {}", [campaignId])
    } else {
        campaign.endDate = callEndDate.value
    }
    let callClaimAmount = campaignContract.try_claimAmount()
    if (callClaimAmount.reverted) {
        log.warning("Claim amount not found. Campaign: {}", [campaignId])
    } else {
        campaign.claimAmount = callClaimAmount.value
    }
    let callClaimedNum = campaignContract.try_claimedNum()
    if (callClaimedNum.reverted) {
        log.warning("Claimed num not found. Campaign: {}", [campaignId])
    } else {
        campaign.claimAmount = callClaimedNum.value
    }
    let callCampaignInfoCid = campaignContract.try_campaignInfoCid()
    if (callCampaignInfoCid.reverted) {
        log.warning("Campaign info cid not found. Campaign: {}", [campaignId])
    } else {
        campaign.campaignInfoCid = callRecipientsCid.value
    }
    let callRecipientsCid = campaignContract.try_recipientsCid()
    if (callRecipientsCid.reverted) {
        log.warning("Recipients cid not found. Campaign: {}", [campaignId])
    } else {
        campaign.recipientsCid = callRecipientsCid.value
    }
    let callStatus = campaignContract.try_status()
    if (callStatus.reverted) {
        log.warning("Status not found. Campaign: {}", [campaignId])
    } else {
        campaign.status = callStatus.value
    }

    campaign.save()
}