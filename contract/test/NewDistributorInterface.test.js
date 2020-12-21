const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("DistributorInterface");
const FanToken = contract.fromArtifact("FanToken");

describe("DistributorInterface", () => {
  const [owner, alice, link] = accounts;

  beforeEach(async () => {
    this.distributor = await Distributor.new("distributor info cid", link, {
      from: owner,
    });
    this.abctoken = await FanToken.new(
      "ABCToken",
      "ABC",
      1000000000,
      owner,
      5,
      owner,
      50,
      5,
      { from: owner }
    );
    this.xyztoken = await FanToken.new(
      "XYZToken",
      "XYZ",
      1000000000,
      owner,
      5,
      owner,
      50,
      5,
      { from: owner }
    );
  });

  it("has a name", async () => {
    expect(await this.distributor.distributorInfoCid()).to.equal(
      "distributor info cid"
    );
  });

  it("has link address", async () => {
    expect(await this.distributor.link()).to.equal(link);
  });
});
