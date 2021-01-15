const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("DistributorInterfaceV2");
const FanToken = contract.fromArtifact("FanToken");

describe("DistributorInterfaceV2", () => {
  const [owner, alice] = accounts;

  beforeEach(async () => {
    this.distributor = await Distributor.new("distributor info cid", {
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

  it("has a cid", async () => {
    expect(await this.distributor.distributorInfoCid()).to.equal(
      "distributor info cid"
    );
  });
});
