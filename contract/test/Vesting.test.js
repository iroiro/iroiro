const {accounts, contract} = require("@openzeppelin/test-environment")
const {time} = require("@openzeppelin/test-helpers")
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
      "ABCToken", "ABC", totalSupply, owner, 5, minter, 50, 5, {from: owner}
    )
    await this.abctoken.transfer(this.vesting.address, totalSupply * 50 / 100, {from: owner})
    assert((await this.abctoken.balanceOf(this.vesting.address)).toString() === "500000000")
  })

  describe("remainingAmount", () => {
    it("returns current balance", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      expect((await this.vesting.remainingAmount(this.abctoken.address)).toString()).to.equal("500000000")
      // TODO Add testing after redeem. Currently conflicts with another test case
    })
  })

  describe("addVesting", () => {
    it("register token as vesting", async () => {
      expect(await this.vesting.vestingTokens(this.abctoken.address)).to.equal(false)
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      expect(await this.vesting.vestingTokens(this.abctoken.address)).to.equal(true)
    })

    it("throw error when sender is not a owner", async () => {
      try {
        await this.vesting.addVesting(
          this.abctoken.address, alice, startTime, endTime, {from: alice}
        )
        assert.fail()
      } catch (error) {
        assert(true)
      }
    })

    it("throw error when trying add token already registered", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      try {
        await this.vesting.addVesting(
          this.abctoken.address, alice, startTime, endTime, {from: owner}
        )
        assert.fail()
      } catch (error) {
        assert(true)
      }
    })

    it("increment token amount", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      expect((await this.vesting.tokensVestingAmount(this.abctoken.address)).toString()).to.equal("500000000")
    })

    it("register account as recipient", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      expect(await this.vesting.tokensRecipient(this.abctoken.address)).to.equal(alice)
    })

    it("register account as recipient", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
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
        this.abctoken.address, alice, futureStartTime, futureEndTime, {from: owner}
      )
      try {
        await this.vesting.redeem(this.xyztoken.address)
        assert.fail("should throw an error")
      } catch (error) {
        assert(true)
      }
    })

    // TODO temporarily disabled for avoid failure due to time util. Fix it
    xit("redeem partial token", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      const oneMonth = 60 * 60 * 24 * 30
      await time.increase(oneMonth)
      await this.vesting.redeem(this.abctoken.address)
      const recipient = await this.vesting.tokensRecipient(this.abctoken.address) // alice

      const recipientBalance = (await this.abctoken.balanceOf(recipient)).toNumber()
      expect(recipientBalance).to.below(totalSupply * 50 / 100)
      expect(recipientBalance).to.above(0)
    })

    it("redeem all token", async () => {
      await this.vesting.addVesting(
        this.abctoken.address, alice, startTime, endTime, {from: owner}
      )
      const oneYear = endTime - startTime
      await time.increase(oneYear)
      await this.vesting.redeem(this.abctoken.address)
      const recipient = await this.vesting.tokensRecipient(this.abctoken.address) // alice

      const recipientBalance = (await this.abctoken.balanceOf(recipient)).toString()
      expect(recipientBalance).to.equal((totalSupply * 50 / 100).toString())
    })
  })

  describe("redeemableAmount", () => {
    it("returns partial token", async () => {
      xyztoken = await FanToken.new(
        "XYZToken", "XYZ", totalSupply, owner, 5, minter, 50, 5, {from: owner}
      )
      xyztoken.transfer(this.vesting.address, 100, { from: owner})
      const start = (await time.latest()).toNumber()
      const end = start + 60 * 60 * 24 * 365
      await this.vesting.addVesting(
        xyztoken.address, alice, start, end, {from: owner}
      )
      expect((await this.vesting.redeemableAmount(xyztoken.address)).toNumber()).to.equal(0)

      const halfYear = 60 * 60 * 24 * 30 * 6
      await time.increase(halfYear)
      const partialAmount = (await this.vesting.redeemableAmount(xyztoken.address)).toNumber()
      expect(partialAmount).to.below(totalSupply * 50 / 100)
      expect(partialAmount).to.above(0)

      const oneYear = end - start
      await time.increase(oneYear)
      expect((await this.vesting.redeemableAmount(xyztoken.address)).toNumber()).to.equal(100)
    })
  })
})
