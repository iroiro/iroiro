const {accounts, contract, web3} = require("@openzeppelin/test-environment")
const {BN, constants, expectEvent, expectRevert, time} = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const Campaign = contract.fromArtifact("AudiusFollowersCampaign")
const Distributer = contract.fromArtifact("AudiusFollowersDistributer")
const FanToken = contract.fromArtifact("FanToken")

describe("AudiusFollowersCampaign", () => {
    const [owner, alice, link] = accounts;

    let now, future

    const campaignInfoCid = "campaign info cid"
    const recipientsCid = "recipients cid"
    const recipientsNum = 100

    beforeEach(async () => {
        this.distributer = await Distributer.new("Audius Test Distributer", link, {from: owner})
        this.abctoken = await FanToken.new(
            "ABCToken", "ABC", 1000000000, owner, 5, owner, 50, 5, {from: owner}
        )
        this.xyztoken = await FanToken.new(
            "XYZToken", "XYZ", 1000000000, owner, 5, owner, 50, 5, {from: owner}
        )
        now = await time.latest()
        future = now.add(time.duration.weeks(1))
        await this.abctoken.approve(this.distributer.address, 100, {from: owner})
        receipt = await this.distributer.createCampaign(
            this.abctoken.address, owner, campaignInfoCid, recipientsCid, recipientsNum, now, future,
            {from: owner}
        )
        campaignAddress = await this.distributer.campaignList(1)
        this.campaign = await Campaign.at(campaignAddress)
    })

    describe("generateClaimKey", () => {
        it("returns claim key", async () => {
            expect((await this.campaign.generateClaimKey(new BN("1"))).toString()).to.equal("11")
        })
    })

    describe("isClaimable", () => {
        it("returns false if user is is not registered", async () => {
            expect(await this.campaign.isClaimable(owner, {from: owner})).to.equal(false)
        })

        xit("returns false if user already claimed", async () => {

        })

        xit("returns false if claim hash is not matched", async () => {

        })

        xit("returns true if claim hash is matched", async () => {

        })
    })

    describe("claim", () => {
        it("throws an error if campaign is not started yet", async() => {

        })

        it("throws an error if campaign is ended", async() => {

        })

        it("throws an error if user is not claimable", async () => {
            expectRevert(this.campaign.claim({from: owner}), "Token is not claimable")
        })

        xit("throws an error if user already claimed", async () => {

        })

        xit("transfer token to user with specific amount", async () => {

        })

        xit("emits event", async () => {

        })
    })

    xdescribe("fulfill", () => {
        it("set key hash list", async () => {

        })
    })

    xdescribe("requestCheckingIsClaimable", async () => {
        beforeEach(async () => {
            // Request to chainlink
        })

        it("set new user id if its not registered yet", async () => {

        })

        it("does not set new user id if its already registered", async () => {

        })

        it("returns request id", async () => {

        })
    })
})
