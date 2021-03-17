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
  BigNumber,
  constants,
  Contract,
  ContractFactory,
  ContractTransaction,
  Signer,
} from "ethers";
import { ethers } from "hardhat";
import { UUIDNFTDistributor } from "../../../types";

describe("UUIDNFTDistributor", () => {
  let owner: Signer;
  let alice: Signer;
  let distributor: UUIDNFTDistributor;

  const mockInput = [
    "23d6ba35-35bf-4de3-b21c-957504a645b1",
    "6ccbe73b-2166-4109-816a-193c9dde9a14",
    "71feb404-7871-4f30-b869-7d68c99f188b",
  ];
  const mockMerkleTree = {
    merkleRoot:
      "0x2a51c4e310ddb4e1fd866e8415c8743d7655721fe168155076871c98037ed1ff",
    tokenTotal: "0x012c",
    claims: {
      "0x1cca01e19858aa423f2195b7e5d071436f19a0cd0c1bf853e18e0ebf78328e5d": {
        index: 0,
        amount: "0x64",
        proof: [
          "0x5bcd09b3e27740228428fef76fe6a0cda6528609a2c583c8cf51ab9a8b03522f",
          "0xc52f202dd78377baaf0a0d1ed257c295da33e30de58dd2cea148cdd7eac8c190",
        ],
      },
      "0x6a6453940381804fa6671a1f1cd3f295f83d751339ed0d8930654d4cdfa5ad75": {
        index: 1,
        amount: "0x64",
        proof: [
          "0x566d3ede60236821802327d27979078b22f77cb745c2d8d337905be977e6d40d",
          "0xc52f202dd78377baaf0a0d1ed257c295da33e30de58dd2cea148cdd7eac8c190",
        ],
      },
      "0x9ca955ecc2d281be4ed5348b0f7a79b263afd8b58d1cf5dbf34e8f53c5443184": {
        index: 2,
        amount: "0x64",
        proof: [
          "0x43052188a102c41a682a3ea69904f75106268b6775919c86fd31b9ee24b501bc",
        ],
      },
    },
  };
  const merkleRoot = mockMerkleTree.merkleRoot;
  const uuid = "23d6ba35-35bf-4de3-b21c-957504a645b1";
  const hashed =
    "0x1cca01e19858aa423f2195b7e5d071436f19a0cd0c1bf853e18e0ebf78328e5d";
  const proof =
    mockMerkleTree.claims[
      "0x1cca01e19858aa423f2195b7e5d071436f19a0cd0c1bf853e18e0ebf78328e5d"
    ].proof;
  const merkleTreeCid = "merkle tree cid";
  const campaignInfoCid = "campaign info cid";
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

  describe("success", () => {
    beforeEach(async () => {
      await distributor.createCampaign(
        merkleRoot,

        merkleTreeCid,
        campaignInfoCid,
        nftMetadataCid,
        100
      );
    });

    it("claim", async () => {
      await distributor.claim(1, 0, uuid, BigNumber.from(100), proof);
    });

    it("emits event", async () => {
      const transaction = await distributor
        .connect(alice)
        .claim(1, 0, uuid, BigNumber.from(100), proof);
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
      expect(transferEvent.args.value).to.equal(100);
    });

    it("revert if index is invalid", async () => {
      await expect(
        distributor.claim(1, 1, uuid, BigNumber.from(100), proof)
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if hash is invalid", async () => {
      await expect(
        distributor.claim(
          1,
          0,
          "00a89857cb180be7b0cc2a6db58b35e69a4c54aa7990bda230f527595e280285",
          BigNumber.from(100),
          proof
        )
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if amount is invalid", async () => {
      await expect(
        distributor.connect(alice).claim(1, 0, uuid, BigNumber.from(10), proof)
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if proof is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(1, 0, uuid, BigNumber.from(100), [
            "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
          ])
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });
  });
});
