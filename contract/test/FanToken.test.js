const {accounts, contract} = require("@openzeppelin/test-environment")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")

describe("FanToken", () => {
  const [owner, alice] = accounts;

  beforeEach(async () => {
    this.fanStockToken = await FanToken.new(
      "FanStock", "FST", 1000000000, owner, {from: owner}
      )
    this.aliceToken = await FanToken.new(
      "AliceToken", "ALC", 2000000000, alice, {from: owner}
      )
  })

  it("has a name", async () => {
    expect(await this.fanStockToken.name()).to.equal("FanStock");
    expect(await this.aliceToken.name()).to.equal("AliceToken");
  })

  it("has a symbol", async () => {
    expect(await this.fanStockToken.symbol()).to.equal("FST");
    expect(await this.aliceToken.symbol()).to.equal("ALC");
  })

  it("mints a token", async() => {
    expect((await this.fanStockToken.totalSupply()).toString()).to.equal("1000000000")
    expect((await this.aliceToken.totalSupply()).toString()).to.equal("2000000000")
  })

  it("transferred a token to creator", async() => {
    expect((await this.fanStockToken.balanceOf(owner)).toString()).to.equal("1000000000")
    expect((await this.aliceToken.balanceOf(alice)).toString()).to.equal("2000000000")
  })
})
