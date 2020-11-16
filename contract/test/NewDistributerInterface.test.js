const {accounts, contract} = require("@openzeppelin/test-environment")
const { constants } = require("@openzeppelin/test-helpers")
const {assert, expect} = require("chai")

const Distributer = contract.fromArtifact("DistributerInterface")
const FanToken = contract.fromArtifact("FanToken")

describe("DistributerInterface", () => {
  const [owner, alice, minter] = accounts;

  beforeEach(async () => {
    this.distributer = await Distributer.new("Test Distributer", { from: owner })
    this.abctoken = await FanToken.new(
        "ABCToken", "ABC", 1000000000, owner, 5, owner, 50, 5, {from: owner}
    )
    this.xyztoken = await FanToken.new(
        "XYZToken", "XYZ", 1000000000, owner, 5, owner, 50, 5, {from: owner}
    )
  })

  it("has a name", async() => {
    expect(await this.distributer.name()).to.equal("Test Distributer")
  })
})
