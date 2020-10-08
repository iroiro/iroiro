const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require('chai');

const TokenFactory = contract.fromArtifact("TokenFactory");

describe("TokenFactory", () => {
  const [owner, alice, bob] = accounts;

  beforeEach(async function () {
    this.contract = await TokenFactory.new({from: owner})
  })

  it("returns a total token count", async function () {
    expect((await this.contract.totalTokenCount()).toString()).to.equal("0");
  })

  it("returns a total address", async function () {
    expect((await this.contract.tokenOf(alice)).toString()).to.equal(constants.ZERO_ADDRESS);
  })

  it("returns a total amount of creator", async function () {
    expect((await this.contract.tokenAmountOf(alice)).toString()).to.equal("0");
  })

  it("returns a total address", async function () {
    expect((await this.contract.tokenOf(alice)).toString()).to.equal(constants.ZERO_ADDRESS);
  })

  describe("createToken", function () {
    it("create a new token", async function () {
      try {
        await this.contract.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
        assert(true)
      } catch (error) {
        assert.fail("should not throw error")
      }
    })

    it("increment totalTokenCount", async function () {
      expect((await this.contract.totalTokenCount()).toString()).to.equal("0")

      await this.contract.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.contract.totalTokenCount()).toString()).to.equal("1")
    })

    it("add token address", async function () {
      await this.contract.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.contract.tokenOf(1)).toString()).to.not.equal(constants.ZERO_ADDRESS)
    })

    it("add creator token amount", async function() {
      await this.contract.createToken(alice, "AliceToken", "ALC", 100000000000, 10, 50, true, 5, false, {from: owner})
      expect((await this.contract.tokenAmountOf(alice)).toString()).to.equal("1")
    })
  })
})
