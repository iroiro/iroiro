const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require('chai');

const TokenFactory = contract.fromArtifact("TokenFactory");
const FanToken = contract.fromArtifact("FanToken");

describe("TokenFactory", () => {
  const [owner, alice, stakingPool] = accounts;

  beforeEach(async function () {
    this.factory = await TokenFactory.new(stakingPool, {from: owner})
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
      const newTokenAddress = await this.factory.tokenOf(1).toString()
      const newCreatorTokenAddress = await this.factory.creatorTokenOf(alice, 1).toString()
      expect(newTokenAddress).to.equal(newCreatorTokenAddress)
    })

    it("mint token with given supply", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const fanToken = await FanToken.at(newTokenAddress)
      expect((await fanToken.totalSupply()).toString()).to.equal(totalSupply.toString())
    })

    it("transfer token to creator", async function () {
      const totalSupply = 100000000000
      await this.factory.createToken(alice, "AliceToken", "ALC", totalSupply, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      const fanToken = await FanToken.at(newTokenAddress)
      // TODO Update amount depend on ratio
      expect((await fanToken.balanceOf(alice)).toString()).to.equal(totalSupply.toString())
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

    it("pool contract can mint a created token", async function () {
      await this.factory.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      const newTokenAddress = await this.factory.tokenOf(1)
      console.debug(newTokenAddress)
      const aliceToken = await FanToken.at(newTokenAddress)
      await aliceToken.mint(alice, 100, {from: stakingPool})
      expect((await aliceToken.balanceOf(alice)).toString()).to.equal("100000000100")
    })

    xit("transfer token to vesting contract", async function () {
      // TODO
    })
  })
})
