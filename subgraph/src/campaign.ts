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

    claim.account = event.params.to.toHexString()
    claim.campaign = event.address.toHexString()
    // TODO replace with calling contract
    claim.amount = event.params.amount

    claim.save()
}

export function handleUpdateStatus(event: UpdateStatus): void {
    let campaignId = event.address.toHexString()
    let campaign = Campaign.load(campaignId)
    if (campaign == null) {
        campaign = new Campaign(campaignId)
    }
    campaign.save()
}