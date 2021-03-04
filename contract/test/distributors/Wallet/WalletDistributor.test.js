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

const { web3 } = require("@openzeppelin/test-environment");
const { constants, expectEvent, time } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = artifacts.require("WalletDistributor");
const Campaign = artifacts.require("WalletCampaign");
const ERC20Mock = artifacts.require("ERC20Mock");

contract("WalletDistributor", (accounts) => {
  const [owner, alice] = accounts;

  let now, future;

  const merkleRoot = web3.utils.soliditySha3("merkleRoot");
  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const merkleTreeCid = "merkle tree cid";
  const recipientsNum = 100;

  beforeEach(async () => {
    this.distributor = await Distributor.new("distributor info cid", {
      from: owner,
    });
    this.abctoken = await ERC20Mock.new("ABCToken", "ABC", owner, 1000000000, {
      from: owner,
    });
    this.xyztoken = await ERC20Mock.new("XYZToken", "XYZ", owner, 1000000000, {
      from: owner,
    });
    now = await time.latest();
    future = now.add(time.duration.weeks(1));
  });

  describe("createCampaign", () => {
    describe("success case", () => {
      let campaignAddress, receipt;
      beforeEach(async () => {
        await this.abctoken.approve(this.distributor.address, 100, {
          from: owner,
        });
        receipt = await this.distributor.createCampaign(
            merkleRoot,
            this.abctoken.address,
            merkleTreeCid,
            "100000",
          { from: owner }
        );
        campaignAddress = await this.distributor.campaignList(1);
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
