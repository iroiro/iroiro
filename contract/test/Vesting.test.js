const {accounts, contract} = require("@openzeppelin/test-environment")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")
const TokenFactory = contract.fromArtifact("TokenFactory")
const Vesting = contract.fromArtifact("Vesting")

describe("Vesting", () => {
  const [owner] = accounts

  describe("redeem", () => {

    beforeEach(async () => {
      this.vesting = await Vesting.new({from: owner})
    })

    it("does not throw error", async() => {
      try {
        await this.vesting.redeem()
        assert(true)
      } catch(error) {
        assert.fail("should not throw an error")
      }
    })
  })
})
