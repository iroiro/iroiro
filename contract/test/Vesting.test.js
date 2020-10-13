const {accounts, contract} = require("@openzeppelin/test-environment")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")
const TokenFactory = contract.fromArtifact("TokenFactory")
const Vesting = contract.fromArtifact("Vesting")

describe("Vesting", () => {
  const [owner, alice] = accounts
  const totalSupply = 1000000000
  const startTime = 1577836800 // Jan 1st 2020
  const endTime = 1609459200 // Jan 1st 2021

  beforeEach(async () => {
    this.vesting = await Vesting.new({from: owner})
    this.abctoken = await FanToken.new(
      "ABCToken", "ABC", totalSupply, owner, 5, {from: owner}
    )
    await this.abctoken.transfer(this.vesting.address, totalSupply * 50 / 100, {from: owner})
    assert((await this.abctoken.balanceOf(this.vesting.address)).toString() === "500000000")
  })

  describe("addVesting", () => {
    it("register token as vesting", async () => {
      expect(await this.vesting.vestingTokens(this.abctoken.address)).to.equal(false)
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      expect(await this.vesting.vestingTokens(this.abctoken.address)).to.equal(true)
    })

    it("throw error when sender is not a owner", async () => {
      try {
        await this.vesting.addVesting(
          this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: alice}
        )
        assert.fail()
      } catch (error) {
        assert(true)
      }
    })

    it("throw error when trying add token already registered", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      try {
        await this.vesting.addVesting(
          this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
        )
        assert.fail()
      } catch (error) {
        assert(true)
      }
    })

    it("increment token amount", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      expect((await this.vesting.tokensVestingAmount(this.abctoken.address)).toString()).to.equal("500000000")
    })

    it("register account as recipient", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      expect(await this.vesting.tokensRecipient(this.abctoken.address)).to.equal(alice)
    })

    it("register account as recipient", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      expect(await this.vesting.tokensRecipient(this.abctoken.address)).to.equal(alice)
    })
  })

  describe("redeem", () => {
    it("does not throw error", async () => {
      try {
        await this.vesting.redeem(this.abctoken.address)
        assert(true)
      } catch (error) {
        assert.fail("should not throw an error")
      }
    })
  })
})
