const {accounts, contract} = require("@openzeppelin/test-environment")
const {time} = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken");
const TokenFactory = contract.fromArtifact("TokenFactory");
const Audius = contract.fromArtifact("Audius");
const Vesting = contract.fromArtifact("Vesting");
const StakingPool = contract.fromArtifact("StakingPool");

describe("Audius", () => {
  const [owner, alice, minter] = accounts
  const totalSupply = 1000000000
  const creatorTokenRatio = 50;

  beforeEach(async () => {
    this.vesting = await Vesting.new({from: owner})
    this.stakingPool = await StakingPool.new({from: owner})
    this.factory = await TokenFactory.new(this.vesting.address, this.stakingPool.address, {from: owner})

    await this.stakingPool.transferOwnership(this.factory.address, {from: owner})
    await this.vesting.transferOwnership(this.factory.address, {from: owner})

    this.audius = await Audius.new(this.factory.address, {from: owner})
    await this.factory.createToken(alice, "SampleToken", "SML", totalSupply, 18, creatorTokenRatio, true, 5, true, {from: alice})

    const sampleTokenAddress = await this.factory.creatorTokenOf(alice, 1)
    this.sampleToken = await FanToken.at(sampleTokenAddress)
    const balance = (await this.sampleToken.balanceOf(alice)).toNumber()

    await this.sampleToken.transfer(this.audius.address, 20000, {from: alice})
  })

  describe("remainingAmount", () => {
    it("returns deposit tokens num ", async () => {
      const remainingAmount = (await this.audius.remainingAmount(this.sampleToken.address)).toNumber()
      expect(remainingAmount).to.equal(20000)
    })

    it("returns correct hash", async () => {
      const id = (await this.factory.tokenAmountOf(alice)).toNumber()
      const tokenAddress = await this.factory.creatorTokenOf(alice, id)
      expect(tokenAddress).to.equal(this.sampleToken.address)
      await this.audius.addAudiusList(
        id,
        "SamppleHash",
        100,
        {from: alice}
      )

      const hash = await this.audius.followersHash(tokenAddress)
      expect(hash).to.equal("SamppleHash")
    })
  })

  // WIP...
})
