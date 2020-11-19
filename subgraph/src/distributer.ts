import {Campaign, Creator, Distributer} from "./types/schema";
import { CreateCampaign } from "./types/AudiusFollowersDistributer/AudiusFollowersDistributer";

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
    campaign.distributer = event.transaction.to.toHex()
    campaign.token = event.params.token.toHexString()
    campaign.startDate = event.params.startDate
    campaign.endDate = event.params.endDate
    campaign.creator = event.transaction.from.toHex()
    campaign.campaignInfoCid = event.params.campaignInfoCid
    campaign.recipientsCid = event.params.recipientsCid

    campaign.save()
}