const {accounts, contract} = require("@openzeppelin/test-environment")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")

describe("FanToken", () => {
  const [owner] = accounts;

  beforeEach(async () => {
    this.fanStockToken = await FanToken.new("FanStock", "FST", {from: owner})
    this.aliceToken = await FanToken.new("AliceToken", "ALC", {from: owner})
  })

  it("has a name", async () => {
    expect(await this.fanStockToken.name()).to.equal("FanStock");
    expect(await this.aliceToken.name()).to.equal("AliceToken");
  })

  it("has a symbol", async () => {
    expect(await this.fanStockToken.symbol()).to.equal("FST");
    expect(await this.aliceToken.symbol()).to.equal("ALC");
  })
})
