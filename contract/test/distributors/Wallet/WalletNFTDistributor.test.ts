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

import { assert, expect } from "chai";
import { BigNumber, constants, ContractTransaction, Signer } from "ethers";
import { ethers } from "hardhat";
import { WalletNFTDistributor } from "../../../types";

describe("WalletNFTDistributor", () => {
  let owner: Signer;
  let alice: Signer;
  let distributor: WalletNFTDistributor;

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
  const merkleTreeCid = "merkle tree cid";
  const campaignInfoCid = "campaign info cid";
  const nftMetadataCid = "nft metadata cid";

  beforeEach(async () => {
    const Distributor = await ethers.getContractFactory("WalletNFTDistributor");

    [owner, alice] = await ethers.getSigners();
    distributor = (await Distributor.deploy(
      "distributor info cid",
      "https://example.com/{id}"
    )) as WalletNFTDistributor;
  });

  describe("createCampaign", () => {
    let transaction: ContractTransaction;
    describe("success case", () => {
      beforeEach(async () => {
        transaction = await distributor.createCampaign(
          merkleRoot,
          merkleTreeCid,
          campaignInfoCid,
          nftMetadataCid,
          100
        );
      });

      it("has a merkle root", async () => {
        expect(await distributor.merkleRoot("1")).to.equal(merkleRoot);
      });

      it("increment next campaign id", async () => {
        expect((await distributor.nextTreeId()).toString()).to.equal("2");
      });

      it("emits event", async () => {
        const receipt = await transaction.wait();
        if (receipt.events === undefined) {
          assert.fail();
        }
        const claimEvent = receipt.events.find(
          (event) => event.event === "CreateCampaign"
        );
        if (claimEvent === undefined || claimEvent.args === undefined) {
          assert.fail();
        }
        expect(claimEvent.args.treeId).to.equal("1");
        expect(claimEvent.args.creator).to.equal(await owner.getAddress());
        expect(claimEvent.args.merkleTreeCid).to.equal(merkleTreeCid);
        expect(claimEvent.args.campaignInfoCid).to.equal(campaignInfoCid);
        expect(claimEvent.args.nftMetadataCid).to.equal(nftMetadataCid);
        expect(claimEvent.args.amount).to.equal(100);
      });
    });
  });

  describe("claim", () => {
    beforeEach(async () => {
      await distributor.createCampaign(
        merkleRoot,
        merkleTreeCid,
        campaignInfoCid,
        nftMetadataCid,
        100
      );
      await distributor.createCampaign(
        merkleRoot,
        merkleTreeCid,
        campaignInfoCid,
        nftMetadataCid,
        200
      );
    });

    it("success", async () => {
      await distributor.claim(
        1,
        1,
        "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
        BigNumber.from(100),
        proof
      );
    });

    it("mint and transfer to account", async () => {
      await distributor
        .connect(alice)
        .claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      expect(
        (
          await distributor.balanceOf(
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            1
          )
        ).toNumber()
      ).to.equals(100);
    });

    it("emits event", async () => {
      const transaction = await distributor
        .connect(alice)
        .claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      const receipt = await transaction.wait();
      if (receipt.events === undefined) {
        assert.fail();
      }
      const transferEvent = receipt.events.find(
        (event) => event.event === "TransferSingle"
      );
      if (transferEvent === undefined || transferEvent.args === undefined) {
        assert.fail();
      }
      expect(transferEvent.args.operator).to.equal(await alice.getAddress());
      expect(transferEvent.args.from).to.equal(constants.AddressZero);
      expect(transferEvent.args.id).to.equal(1);
      expect(transferEvent.args.to).to.equal(
        "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1"
      );
      expect(transferEvent.args.value).to.equal(100);
    });

    it("mint and transfer to proper account on multiple distribution", async () => {
      await distributor
        .connect(alice)
        .claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      expect(
        (
          await distributor.balanceOf(
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            1
          )
        ).toNumber()
      ).to.equals(100);
      await distributor
        .connect(alice)
        .claim(
          1,
          2,
          "0x0350D208F3D94Af84724e437fAa7ebe5A3C35aC7",
          BigNumber.from(100),
          [
            "0xd77db87087a1cd0a89b7eb04e0c180dbca03f46b1aed7618dd8c1520ed20969e",
            "0x1aa7eb3923684d4f0213dcf513ed8a529cdf8f0fb89901a3dc0ed1a883e30460",
            "0x3bbb656f8ba0de770b2c6743036f7e1c6e9b4f51813d07d396bd308b97a01d67",
            "0xdcfc4ba455ccfc71da6d8d97e2e4ce6205a172176133e612c115d623d9dc4592",
            "0x9446c03efafeb100f8d8546268672a191df7ff9d270e5f8aa9b74a38716252d2",
            "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
            "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
          ]
        );
      expect(
        (
          await distributor.balanceOf(
            "0x0350D208F3D94Af84724e437fAa7ebe5A3C35aC7",
            1
          )
        ).toNumber()
      ).to.equals(100);
      await distributor
        .connect(alice)
        .claim(
          2,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      expect(
        (
          await distributor.balanceOf(
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            2
          )
        ).toNumber()
      ).to.equals(100);
    });

    it("revert if already claimed", async () => {
      await distributor
        .connect(alice)
        .claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      await expect(
        distributor
          .connect(alice)
          .claim(
            1,
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            BigNumber.from(100),
            proof
          )
      ).to.be.revertedWith("MerkleTree: Already proven.");
    });

    it("revert if index is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(
            1,
            2,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            BigNumber.from(100),
            proof
          )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if address is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(
            1,
            1,
            "0x01dc7f8c928cea27d8ff928363111c291beb20b2",
            BigNumber.from(100),
            proof
          )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if amount is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(
            1,
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            BigNumber.from(10),
            proof
          )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if proof is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(
            1,
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            BigNumber.from(100),
            [
              "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
              "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
              "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
              "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
              "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
              "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
            ]
          )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });
  });
});
