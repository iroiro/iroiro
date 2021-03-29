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
import {
  constants,
  ContractFactory,
  ContractTransaction,
  Signer,
} from "ethers";
import { ethers } from "hardhat";
import { UUIDNFTDistributor } from "../../../types";
import input from "./example_merkle_tree_one.json";

describe("UUIDNFTDistributor", () => {
  let owner: Signer;
  let alice: Signer;
  let distributor: UUIDNFTDistributor;

  const mockInput = [
    "23d6ba35-35bf-4de3-b21c-957504a645b1",
    "6ccbe73b-2166-4109-816a-193c9dde9a14",
    "71feb404-7871-4f30-b869-7d68c99f188b",
  ];
  const mockMerkleTree = input;
  const merkleRoot = mockMerkleTree.merkleRoot;
  const uuid = "494f92fd-9941-4c46-82b3-752cfd98b3d9";
  const hashed =
    "0xf9ffed0dacf6546376b18d4a9b60f4221c39b4c704b40c71cf402ee84f0dc2b3";
  const proof =
    mockMerkleTree.claims[
      "0xf9ffed0dacf6546376b18d4a9b60f4221c39b4c704b40c71cf402ee84f0dc2b3"
    ].proof;
  const merkleTreeCid = "merkle tree cid";
  const nftMetadataCid = "nft metadata cid";

  beforeEach(async () => {
    const Distributor: ContractFactory = await ethers.getContractFactory(
      "UUIDNFTDistributor"
    );

    [owner, alice] = await ethers.getSigners();
    distributor = (await Distributor.deploy(
      "distributor info cid",
      "https://example.com/{id}"
    )) as UUIDNFTDistributor;
  });

  describe("createCampaign", () => {
    let transaction: ContractTransaction;
    describe("success case", () => {
      beforeEach(async () => {
        transaction = await distributor.createCampaign(
          merkleRoot,
          merkleTreeCid,
          nftMetadataCid
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
        expect(claimEvent.args.nftMetadataCid).to.equal(nftMetadataCid);
      });
    });
  });

  describe("success", () => {
    beforeEach(async () => {
      await distributor.createCampaign(
        merkleRoot,
        merkleTreeCid,
        nftMetadataCid
      );
      await distributor.createCampaign(
        merkleRoot,
        merkleTreeCid,
        nftMetadataCid
      );
    });

    it("claim", async () => {
      await distributor.claim(1, 96, uuid, proof);
    });

    it("mint and transfer to account", async () => {
      await distributor.connect(alice).claim(1, 96, uuid, proof);
      expect(
        (await distributor.balanceOf(await alice.getAddress(), 1)).toNumber()
      ).to.equal(1);
    });

    it("emits event", async () => {
      const transaction = await distributor
        .connect(alice)
        .claim(1, 96, uuid, proof);
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
      expect(transferEvent.args.to).to.equal(await alice.getAddress());
      expect(transferEvent.args.value).to.equal(1);
    });

    it("mint and transfer to proper account on multiple distribution", async () => {
      await distributor.connect(alice).claim(1, 96, uuid, proof);
      expect(
        (await distributor.balanceOf(await alice.getAddress(), 1)).toNumber()
      ).to.equal(1);
      await distributor.claim(1, 40, "bb18c18f-24cf-47d3-8684-eb39002a04b2", [
        "0xc26d0c24ecb79c6f7d22b47726dadaf66a2a57b8d21a2e3acdfcca4a71f6c332",
        "0xa637277383e7657f43ae2c6005cf8bd0e3679a9211451ee822c5192a659f1a5f",
        "0x1dcc3a8f5d63c54a9d1e892e7f0836af0aff79d88cd8a12562c08a0a7028c346",
        "0xe56f98b52da98eb95a08f9de61463ea015e431c3e3263ac600b5ef2cd79ba333",
        "0xa5710fef87930c3726299f9af2b16becd31fcac5afe09ba22ec782dac945a47d",
        "0x139ab2f68b87672824464b44df5d57e57f0bb6439e4835e1f05dcc0b7d3aa0cd",
        "0x4298a95a9053b62dbdae44caae5bc3ecdce12c55c0bb421445da2613abc947f8",
      ]);
      expect(
        (await distributor.balanceOf(await owner.getAddress(), 1)).toNumber()
      ).to.equal(1);
      await distributor.connect(alice).claim(2, 96, uuid, proof);
      expect(
        (await distributor.balanceOf(await alice.getAddress(), 2)).toNumber()
      ).to.equal(1);
    });

    it("revert if already claimed", async () => {
      await distributor.connect(alice).claim(1, 96, uuid, proof);
      await expect(
        distributor.connect(alice).claim(1, 96, uuid, proof)
      ).to.be.revertedWith("MerkleTree: Already proven.");
    });

    it("revert if index is invalid", async () => {
      await expect(distributor.claim(1, 1, uuid, proof)).to.be.revertedWith(
        "MerkleTree: Invalid proof."
      );
    });

    it("revert if hash is invalid", async () => {
      await expect(
        distributor.claim(
          1,
          96,
          "0xfa89b4584ba8d71f23e99af844bd66cff7c4db69a40ced66b6582f9839d08801",
          proof
        )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if proof is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(1, 96, uuid, [
            "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
          ])
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });
  });
});
