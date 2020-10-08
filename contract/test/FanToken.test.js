const {accounts, contract} = require("@openzeppelin/test-environment")
const {assert, expect} = require("chai")

const FanToken = contract.fromArtifact("FanToken")

describe("FanToken", () => {
  const [owner] = accounts;

  beforeEach(async () => {
    this.contract = await FanToken.new({from: owner})
  })

  it("has a name", async () => {
    expect(await this.contract.name()).to.equal("FanStock");
  })

  it("has a symbol", async () => {
    expect(await this.contract.symbol()).to.equal("FST");
  })
})
