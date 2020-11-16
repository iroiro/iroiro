const {accounts, contract} = require("@openzeppelin/test-environment")
const { BN, constants, time } = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const Campaign = contract.fromArtifact("CampaignInterface")
const FanToken = contract.fromArtifact("FanToken")

describe("CampaignInterface", () => {
  const [owner, alice, minter] = accounts;
  let now, future;

  beforeEach(async () => {
    this.abctoken = await FanToken.new(
        "ABCToken", "ABC", 1000000000, owner, 5, owner, 50, 5, {from: owner}
    )
    this.xyztoken = await FanToken.new(
        "XYZToken", "XYZ", 1000000000, owner, 5, owner, 50, 5, {from: owner}
    )
    now = await time.latest()
    future = now.add(time.duration.weeks(1))
    this.campaign = await Campaign.new(
        this.abctoken.address,
        "campaign info cid",
        "recipients cid",
        100000,
        alice,
        now,
        future,
        "https://example.com/",
        { from: owner })
  })

  it("has a state variables", async() => {
    expect(await this.campaign.token()).to.be.equal(this.abctoken.address)
    expect(await this.campaign.campaignInfoCid()).to.be.equal("campaign info cid")
    expect(await this.campaign.recipientsCid()).to.be.equal("recipients cid")
    expect((await this.campaign.claimAmount()).toString()).to.be.equal("100000")
    expect((await this.campaign.claimedNum()).toString()).to.be.equal("0")
    expect(await this.campaign.refundDestination()).to.be.equal(alice)
    expect(await this.campaign.startDate()).to.be.bignumber.equal(now)
    expect(await this.campaign.endDate()).to.be.bignumber.equal(future)
    expect(await this.campaign.baseURL()).to.be.equal("https://example.com/")
    expect((await this.campaign.status()).toString()).to.be.equal("0")
  })
})
