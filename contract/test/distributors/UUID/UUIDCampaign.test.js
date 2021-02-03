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
const {
  BN,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("UUIDDistributor");
const Campaign = contract.fromArtifact("UUIDCampaign");
const FanToken = contract.fromArtifact("FanToken");

describe("UUIDCampaign", () => {
  const [defaultAccount, alice, bob, consumer, follower, metamask] = accounts;

  let cc, distributor, campaign, abctoken, now, future;

  const merkleRoot =
    "0xf23c8c7ccd32b230dde25eafaaa8c65d04d06752ffaa703679bb7c51bd5ea1b7";
  const hashed =
    "041b769bafce143707f137e560e08fd8314aba4387c7395c77ca469387cc49d5";
  const proof = [
    "0x43df09a07430861558b98b57c672b7d384c6b0520f3476dd43a036381952835e",
    "0x9bbb68c9cb0f1a27d0dfbb72c8405916c9c9705a4e13638ba302f03744d017ae",
    "0x6987dd0087df9f37c25e608f6c3e2261008f488a242a5668439cd0a0ecff294f",
    "0x97a8aeffb1810ea9b0763462e3de9cc590313a79482e1dd042510d9802c524a9",
    "0x8dffa9de166ba1657468dc20c42287c2057b550f56dc0de9e4f99a3274893560",
    "0xefd22e1ab98750f9d285a6a0a4c251de668878db2d5c824630f4f763494e0b2e",
    "0x04b1625747fc935af80ed33fc9f8410b4a7aa57c0e6b24beb892b80890ff9778",
  ];
  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const merkleTreeCid = "merkle tree cid";
  const recipientsNum = 100;

  beforeEach(async () => {
    distributor = await Distributor.new("Wallet Test Distributor", {
      from: defaultAccount,
    });
    abctoken = await FanToken.new(
      "ABCToken",
      "ABC",
      1000000000,
      defaultAccount,
      5,
      defaultAccount,
      50,
      5,
      { from: defaultAccount }
    );
    await abctoken.transfer(consumer, 1000, { from: defaultAccount });
    await abctoken.approve(distributor.address, 1000, { from: consumer });
    now = await time.latest();
    future = now.add(time.duration.weeks(4));
    await abctoken.approve(distributor.address, 100, { from: defaultAccount });
    await distributor.createCampaign(
      merkleRoot,
      abctoken.address,
      consumer,
      campaignInfoCid,
      recipientsCid,
      merkleTreeCid,
      recipientsNum,
      now,
      future,
      { from: consumer }
    );
    const campaignAddress = await distributor.campaignList(1);
    cc = await Campaign.at(campaignAddress);
  });

  it("has merkle tree cid", async () => {
    const merkleTreeCid = await cc.merkleTreeCid();
    expect(merkleTreeCid).to.equal("merkle tree cid");
  });

  describe("claim", () => {
    describe("future campaign", () => {
      let futurecc;
      beforeEach(async () => {
        await abctoken.transfer(consumer, 1000, { from: defaultAccount });
        await abctoken.approve(distributor.address, 1000, { from: consumer });
        const oneweeklater = await now.add(time.duration.weeks(1));
        const twoweeklater = await now.add(time.duration.weeks(2));
        await abctoken.approve(distributor.address, 100, {
          from: defaultAccount,
        });
        await distributor.createCampaign(
          merkleRoot,
          abctoken.address,
          consumer,
          campaignInfoCid,
          recipientsCid,
          merkleTreeCid,
          recipientsNum,
          oneweeklater,
          twoweeklater,
          { from: consumer }
        );
        const futurecampaignaddress = await distributor.campaignList(2);
        futurecc = await Campaign.at(futurecampaignaddress);
      });

      it("throws an error if campaign is not started yet", async () => {
        try {
          await futurecc.claim(1, hashed, new BN(100), proof);
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("Campaign is not started yet");
          assert(true);
        }
      });
    });

    describe("past campaign", () => {
      let pastcc;
      beforeEach(async () => {
        await abctoken.transfer(consumer, 1000, { from: defaultAccount });
        await abctoken.approve(distributor.address, 1000, { from: consumer });
        const now = await time.latest();
        const oneweeklater = await now.add(time.duration.weeks(1));
        await abctoken.approve(distributor.address, 100, {
          from: defaultAccount,
        });
        await distributor.createCampaign(
          merkleRoot,
          abctoken.address,
          consumer,
          campaignInfoCid,
          recipientsCid,
          merkleTreeCid,
          recipientsNum,
          now,
          oneweeklater,
          { from: consumer }
        );
        const pastcampaignaddress = await distributor.campaignList(2);
        pastcc = await Campaign.at(pastcampaignaddress);
      });

      it("throws an error if campaign is finished", async () => {
        time.increase(time.duration.weeks(2));
        try {
          await pastcc.claim(1, hashed, new BN(100), proof);
          assert.fail();
        } catch (error) {
          expect(error.reason).to.equal("Campaign is finished");
          assert(true);
        }
      });
    });

    describe("active campaign", () => {
      it("claim", async () => {
        await cc.claim(1, hashed, new BN(100), proof);
      });

      it("increment claimedNum", async () => {
        const claimedNumBefore = await cc.claimedNum();
        expect(claimedNumBefore).to.be.bignumber.equal(new BN(0));
        await cc.claim(1, hashed, new BN(100), proof);
        const claimedNumAfter = await cc.claimedNum();
        expect(claimedNumAfter).to.be.bignumber.equal(new BN(1));
      });

      it("emits event", async () => {
        const receipt = await cc.claim(1, hashed, new BN(100), proof, {
          from: alice,
        });
        expectEvent(receipt, "Claim", {
          from: alice,
          to: alice,
        });
      });

      it("revert if index is invalid", async () => {
        await expectRevert(
          cc.claim(2, hashed, new BN(100), proof, { from: alice }),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if hashed uuid is invalid", async () => {
        await expectRevert(
          cc.claim(
            1,
            "00a89857cb180be7b0cc2a6db58b35e69a4c54aa7990bda230f527595e280285",
            new BN(100),
            proof,
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if amount is invalid", async () => {
        await expectRevert(
          cc.claim(1, hashed, new BN(1000), proof, { from: alice }),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if proof is invalid", async () => {
        await expectRevert(
          cc.claim(
            1,
            hashed,
            new BN(100),
            [
              "0xa97179ad6550ba6e11633a372fea1573d360947661071eaff49c0f4ced01997f",
              "0x82486374430ade45db5480dd192f15ece4860044f0b157dfefcdea0d4f225360",
              "0x563f81bba508d6fd8f916526f8ac720968dc8201d9c7bd4abaa37859b708f7c7",
              "0xd29cd23c80df2ab293468a3a0baca119e8e7648b298abd400b5fe523156ad2dc",
              "0x26cdbac8b1cea3b2e608703c109e91e735321919a68e5a3df07289fd67214b4f",
              "0xca3568b453a3cf87df549d5bc2aa905f26380e77d3479329f11bfab659130d6e",
            ],
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });
    });
  });
});
