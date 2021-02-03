/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants, expectEvent, time } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("CCTWalletDistributor");
const Campaign = contract.fromArtifact("CCTWalletCampaign");
const FanToken = contract.fromArtifact("FanToken");

describe("CCTWalletDistributor", () => {
  const [owner, alice, link] = accounts;

  let now, future;

  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const recipientsNum = 100;

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
    now = await time.latest();
    future = now.add(time.duration.weeks(1));
  });

  describe("createCampaign", () => {
    it("throws an error if msg.sender is not matched to token sender", async () => {
      try {
        await this.distributor.createCampaign(
          this.abctoken.address,
          owner,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          now,
          future,
          { from: alice }
        );
        assert.fail();
      } catch (error) {
        expect(error.reason).to.equal("Token holder must match to msg.sender");
        assert(true);
      }
    });

    it("throws an error if there is no allowance", async () => {
      try {
        await this.distributor.createCampaign(
          this.abctoken.address,
          owner,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          now,
          future,
          { from: owner }
        );
        assert.fail();
      } catch (error) {
        expect(error.reason).to.equal("No token is approved to transfer");
        assert(true);
      }
    });

    it("throws an error if allowance is not enough to recipients", async () => {
      await this.abctoken.approve(this.distributor.address, 99, {
        from: owner,
      });
      try {
        await this.distributor.createCampaign(
          this.abctoken.address,
          owner,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          now,
          future,
          { from: owner }
        );
        assert.fail();
      } catch (error) {
        expect(error.reason).to.equal(
          "Token amount is not enough to distribute"
        );
        assert(true);
      }
    });

    describe("success case", () => {
      let campaignAddress, receipt;
      beforeEach(async () => {
        await this.abctoken.approve(this.distributor.address, 100, {
          from: owner,
        });
        receipt = await this.distributor.createCampaign(
          this.abctoken.address,
          owner,
          campaignInfoCid,
          recipientsCid,
          recipientsNum,
          now,
          future,
          { from: owner }
        );
        campaignAddress = await this.distributor.campaignList(1);
        console.debug("Campaign Address: ", campaignAddress);
      });

      it("create new campaign", async () => {
        expect(campaignAddress).to.not.equal(constants.ZERO_ADDRESS);
      });

      it("transfers token of approved amount", async () => {
        expect(
          (await this.abctoken.balanceOf(campaignAddress)).toString()
        ).to.equal("100");
      });

      it("increment next campaign id", async () => {
        expect((await this.distributor.nextCampaignId()).toString()).to.equal(
          "2"
        );
      });

      it("transfers ownership to msg.sender", async () => {
        const campaign = await Campaign.at(campaignAddress);
        expect(await campaign.owner()).to.equal(owner);
      });

      it("emits event", async () => {
        expectEvent(receipt, "CreateCampaign", {
          campaign: campaignAddress,
          token: this.abctoken.address,
          creator: owner,
        });
      });
    });
  });
});
