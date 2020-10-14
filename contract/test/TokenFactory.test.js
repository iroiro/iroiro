const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require('chai');

const TokenFactory = contract.fromArtifact("TokenFactory");
const FanToken = contract.fromArtifact("FanToken");
const Vesting = contract.fromArtifact("Vesting");
const StakingPool = contract.fromArtifact("StakingPool");

describe("TokenFactory", () => {
  const [owner, alice, pool] = accounts;

  beforeEach(async function () {
    this.vesting = await Vesting.new({from: owner})
    this.stakingPool = await StakingPool.new({from: owner})
    this.factory = await TokenFactory.new(this.vesting.address, this.stakingPool.address, {from: owner})
    await this.stakingPool.transferOwnership(this.factory.address, {from: owner})
    await this.vesting.transferOwnership(this.factory.address, {from: owner})
  })

  it("returns a total token count", async function () {
    expect((await this.factory.totalTokenCount()).toString()).to.equal("0");
  })

  it("returns a total address", async function () {
    expect((await this.factory.tokenOf(alice)).toString()).to.equal(constants.ZERO_ADDRESS);
  })

  it("returns a total amount of creator", async function () {
    expect((await this.factory.tokenAmountOf(alice)).toString()).to.equal("0");
  })

  it("returns a total address", async function () {
    expect((await this.factory.tokenOf(alice)).toString()).to.equal(constants.ZERO_ADDRESS);
  })

  describe("createToken", function () {
    it("create a new token", async function () {
      try {
        this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
        assert(true)
      } catch (error) {
        assert.fail("should not throw error")
      }
    })

    it("throw an error invalid ratio", async function () {
      try {
        await this.factory.createToken(alice, "ValidRatioToken", "VLD", 100000000000, 10, 0, true, 5, false, {from: owner})
        await this.factory.createToken(alice, "ValidRatioToken", "VLD", 100000000000, 10, 100, true, 5, false, {from: owner})
        assert(true)
      } catch (error) {
        assert.fail("should not throw error")
      }
      try {
        await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 101, true, 5, false, {from: owner})
        assert.fail("should throw error")
      } catch (error) {
        assert(true)
      }
    })

    it("throw an error if token amount is too small", async function () {
      try {
        await this.factory.createToken(alice, "AliceToken", "ALC", 10, 0, 100, true, 5, false, {from: owner})
        assert.fail("should throw error")
      } catch (error) {
        assert(true)
      }
    })

    it("increment totalTokenCount", async function () {
      expect((await this.factory.totalTokenCount()).toString()).to.equal("0")

      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.factory.totalTokenCount()).toString()).to.equal("1")
    })

    it("add token address", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.factory.tokenOf(1)).toString()).to.not.equal(constants.ZERO_ADDRESS)
    })

    it("add creator token amount", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.factory.tokenAmountOf(alice)).toString()).to.equal("1")
    })

    it("add creator token address", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.factory.tokenAmountOf(alice)).toString()).to.not.equal(constants.ZERO_ADDRESS)
    })

    it("both of token and creator token address newly added is same", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = (await this.factory.tokenOf(1)).toString()
      const newCreatorTokenAddress = (await this.factory.creatorTokenOf(alice, 1)).toString()
      expect(newTokenAddress).to.equal(newCreatorTokenAddress)
    })

    it("mint token with given supply", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const fanToken = await FanToken.at(newTokenAddress)
      expect((await fanToken.totalSupply()).toString()).to.equal(totalSupply.toString())
    })


    it("transfer token to vesting", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 40, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const fanToken = await FanToken.at(newTokenAddress)
      const creatorBalance = (await fanToken.balanceOf(this.vesting.address)).toString() // Vesting amount is for creator
      expect(creatorBalance).to.equal("40000000000")
    })

    it("transfer token to creator", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 40, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const fanToken = await FanToken.at(newTokenAddress)
      const balanceForFans = (await fanToken.balanceOf(alice)).toString() // Balance creator holds is for fans
      expect(balanceForFans).to.equal("60000000000")
    })

    it("add vesting", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 40, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      expect(await this.vesting.vestingTokens(newTokenAddress)).to.equal(true)
      expect((await this.vesting.tokensVestingAmount(newTokenAddress)).toString()).to.equal("40000000000")
      expect(await this.vesting.tokensRecipient(newTokenAddress)).to.equal(alice)
      const start = (await this.vesting.tokensVestingStart(newTokenAddress)).toNumber()
      const end = (await this.vesting.tokensVestingEnd(newTokenAddress)).toNumber()
      expect(end).to.equal(start + 5 * 365 * 24 * 60 * 60)
      expect((await this.vesting.tokensLastUpdate(newTokenAddress)).toNumber()).to.equal(start)
    })

    it("add staking", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 40, true, 5, true, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      expect(await this.stakingPool.tokensStakingPaused(newTokenAddress)).to.equal(false)
    })

    it("factory contract nor user can not mint a created token", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const aliceToken = await FanToken.at(newTokenAddress)
      try {
        await aliceToken.mint(alice, 100, {from: alice})
        assert.fail("should not throw error")
      } catch (error) {
        assert(true)
      }
      try {
        await aliceToken.mint(alice, 100, {from: owner})
        assert.fail("should not throw error")
      } catch (error) {
        assert(true)
      }
    })

    xit("pool contract can mint a created token", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const aliceToken = await FanToken.at(newTokenAddress)
      // TODO: Fix: Error: Returned error: sender account not recognized
      await aliceToken.mint(alice, 100, {from: this.stakingPool.address})
      expect((await aliceToken.balanceOf(alice)).toString()).to.equal("50000000100")
    })
  })
})
