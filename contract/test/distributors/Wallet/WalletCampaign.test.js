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

const {
  BN,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = artifacts.require("WalletDistributor");
const Campaign = artifacts.require("WalletCampaign");
const ERC20Mock = artifacts.require("ERC20Mock");

contract("WalletCampaign", (accounts) => {
  const [defaultAccount, alice, bob, consumer, follower, metamask] = accounts;

  let cc, distributor, campaign, abctoken, now, future;

  const merkleRoot =
    "0x33e954d45e481a7c78be8cb27f39277113b2519ef0c0d237ab91a054d4bc4f7a";
  const proof = [
    "0xb2edb7e841c03b8394638ba04b3bd2e9769b0d29586a4d476bf71d84e1612b46",
    "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
    "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
    "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
    "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
    "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
    "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
  ];
  const campaignInfoCid = "campaign info cid";
  const recipientsCid = "recipients cid";
  const merkleTreeCid = "merkle tree cid";
  const recipientsNum = 100;

  beforeEach(async () => {
    distributor = await Distributor.new("Wallet Test Distributor", {
      from: defaultAccount,
    });
    abctoken = await ERC20Mock.new(
      "ABCToken",
      "ABC",
      defaultAccount,
      1000000000,
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
        merkleTreeCid,
        1000000000,
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
    describe("active campaign", () => {
      it("claim", async () => {
        await cc.claim(
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          new BN(100),
          proof
        );
      });

      it("increment claimedNum", async () => {
        const claimedNumBefore = await cc.claimedNum();
        expect(claimedNumBefore).to.be.bignumber.equal(new BN(0));
        await cc.claim(
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          new BN(100),
          proof
        );
        const claimedNumAfter = await cc.claimedNum();
        expect(claimedNumAfter).to.be.bignumber.equal(new BN(1));
      });

      it("emits event", async () => {
        const receipt = await cc.claim(
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          new BN(100),
          proof,
          { from: alice }
        );
        expectEvent(receipt, "Claim", {
          from: "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          to: "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
        });
      });

      it("revert if index is invalid", async () => {
        await expectRevert(
          cc.claim(
            2,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            new BN(100),
            proof,
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if address is invalid", async () => {
        await expectRevert(
          cc.claim(
            1,
            "0x01dc7f8c928cea27d8ff928363111c291beb20b2",
            new BN(100),
            proof,
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if amount is invalid", async () => {
        await expectRevert(
          cc.claim(
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            new BN(1000),
            [
              "0xb2edb7e841c03b8394638ba04b3bd2e9769b0d29586a4d476bf71d84e1612b46",
              "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
              "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
              "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
              "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
              "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
              "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
            ],
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });

      it("revert if proof is invalid", async () => {
        await expectRevert(
          cc.claim(
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            new BN(100),
            [
              "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
              "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
              "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
              "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
              "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
              "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
            ],
            { from: alice }
          ),
          "MerkleDistributor: Invalid proof."
        );
      });
    });
  });
});
