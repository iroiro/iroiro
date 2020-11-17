import {Claim, Campaign} from "./types/schema";
import {Claim as ClaimEvent, UpdateStatus} from "./types/templates/AudiusFollowersCampaign/AudiusFollowersCampaign";

export function handleClaim(event: ClaimEvent): void {
    let accountId = event.transaction.from.toHexString()
    let campaignId = event.transaction.to.toHexString()
    let claimId = accountId.concat('-').concat(campaignId)
    let claim = Claim.load(claimId)
    if (claim == null) {
        claim = new Claim(claimId)
    }
    claim.save()
}

export function handleUpdateStatus(event: UpdateStatus): void {
    let campaignId = event.transaction.to.toHexString()
    let campaign = Campaign.load(campaignId)
    if (campaign == null) {
        campaign = new Campaign(campaignId)
    }
    campaign.save()
}