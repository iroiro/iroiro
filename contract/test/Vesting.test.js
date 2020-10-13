const {accounts, contract} = require("@openzeppelin/test-environment")
const { time } = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")
const TokenFactory = contract.fromArtifact("TokenFactory")
const Vesting = contract.fromArtifact("Vesting")

describe("Vesting", () => {
  const [owner, alice, minter] = accounts
  const totalSupply = 1000000000
  const startTime = 1577836800 // Jan 1st 2020
  const endTime = 1609459200 // Jan 1st 2021
  const futureStartTime = 1735689600 // Jan 1st 2025
  const futureEndTime = 1767225600 // Jan 1st 2026

  beforeEach(async () => {
    this.vesting = await Vesting.new({from: owner})
    this.abctoken = await FanToken.new(
      "ABCToken", "ABC", totalSupply, owner, 5, minter, {from: owner}
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
    it("throw an error when token is not registered", async () => {
      try {
        await this.vesting.redeem(this.xyztoken.address)
        assert.fail("should throw an error")
      } catch (error) {
        assert(true)
      }
    })

    it("throw an error when token vesting is not started", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, futureStartTime, futureEndTime, {from: owner}
      )
      try {
        await this.vesting.redeem(this.xyztoken.address)
        assert.fail("should throw an error")
      } catch (error) {
        assert(true)
      }
    })

    it("redeem partial token", async() => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      const oneMonth = 60 * 60 * 24 * 30
      await time.increase(oneMonth)
      await this.vesting.redeem(this.abctoken.address)
      const recipient = await this.vesting.tokensRecipient(this.abctoken.address) // alice

      const recipientBalance = (await this.abctoken.balanceOf(recipient)).toNumber()
      expect(recipientBalance).to.below(totalSupply * 50 / 100)
      expect(recipientBalance).to.above(0)
    })

    it("redeem all token", async() => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, totalSupply * 50 / 100, startTime, endTime, {from: owner}
      )
      const oneYear = endTime - startTime
      await time.increase(oneYear)
      await this.vesting.redeem(this.abctoken.address)
      const recipient = await this.vesting.tokensRecipient(this.abctoken.address) // alice

      const recipientBalance = (await this.abctoken.balanceOf(recipient)).toString()
      expect(recipientBalance).to.equal((totalSupply * 50 / 100).toString())
    })
  })
})
