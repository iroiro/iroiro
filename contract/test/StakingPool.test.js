const {accounts, contract} = require("@openzeppelin/test-environment")
const {constants} = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const StakingPool = contract.fromArtifact("StakingPool")

describe("StakingPool", () => {
  const [owner, alice, bob] = accounts;

  beforeEach(async () => {
    this.pool = await StakingPool.new({from: owner})
  })

  it("return earned amount", async() => {
    expect((await this.pool.earned(alice, constants.ZERO_ADDRESS)).toString()).to.equal("0")
  })
})
