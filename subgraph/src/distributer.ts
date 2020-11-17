import { Campaign, Distributer} from "./types/schema";
import { CreateCampaign } from "./types/AudiusFollowersDistributer/AudiusFollowersDistributer";

export function handleCreateCampaign(event: CreateCampaign): void {
    let distributerId = event.transaction.to.toHexString()
    let distributer = Distributer.load(distributerId)
    if (distributer == null) {
        distributer = new Distributer(distributerId)
    }
    distributer.save()

    let campaignId = event.params.campaign.toHexString()
    let campaign = Campaign.load(campaignId)
    if (campaign == null) {
        campaign = new Campaign(campaignId)
    }
    campaign.save()
}