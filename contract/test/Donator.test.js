const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Donator = contract.fromArtifact("Donator");
const FanToken = contract.fromArtifact("FanToken");

describe("FanToken", () => {
  const [owner, alice, minter] = accounts;

  beforeEach(async () => {
    this.donator = await Donator.new({ from: owner });
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

  describe("tokenDonateeList", () => {
    it("returns zero address", async () => {
      expect(
        await this.donator.tokenDonateeList(this.abctoken.address)
      ).to.equal(constants.ZERO_ADDRESS);
    });

    it("returns creator address", async () => {
      await this.donator.setDonatee(this.abctoken.address, { from: alice });
      expect(
        await this.donator.tokenDonateeList(this.abctoken.address)
      ).to.equal(alice);
      expect(
        await this.donator.tokenDonateeList(this.xyztoken.address)
      ).to.equal(constants.ZERO_ADDRESS);
    });
  });

  describe("setDonatee", () => {
    it("set donatee address", async () => {
      await this.donator.setDonatee(alice, { from: alice });
      expect(await this.donator.tokenDonateeList(alice)).to.equal(alice);
    });
  });

  describe("donate", () => {
    beforeEach(async () => {
      await this.donator.setDonatee(this.abctoken.address, { from: alice });
      await this.abctoken.approve(this.donator.address, 10000, { from: owner });
    });

    it("throw an error if donatee is not registered", async () => {
      try {
        await this.donator.donate(this.xyztoken.address, 10000, {
          from: owner,
        });
        assert.fail("should not throw error");
      } catch (error) {
        expect(error.reason).to.equal("Donatee is not registered yet");
        assert(true);
      }
    });

    it("throw an error if amount is not approved", async () => {
      try {
        await this.donator.donate(this.abctoken.address, 10001, {
          from: owner,
        });
        assert.fail("should not throw error");
      } catch (error) {
        expect(error.reason).to.equal(
          "ERC20: transfer amount exceeds allowance"
        );
        assert(true);
      }
    });

    it("transfer successfully", async () => {
      await this.donator.donate(this.abctoken.address, 10000, { from: owner });
    });
  });
});
