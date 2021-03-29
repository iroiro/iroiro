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
import { constants, ContractTransaction, Signer } from "ethers";
import { ethers } from "hardhat";
import { WalletNFTDistributor } from "../../../types";

describe("WalletNFTDistributor", () => {
  let owner: Signer;
  let alice: Signer;
  let distributor: WalletNFTDistributor;

  const merkleRoot =
    "0x4ce3f9586d7bf671a1c39c44270ffeca51280ea252ced88ba0b8e622b6cfd61a";
  const proof = [
    "0x32c10051148c88559b11ac5fe1af4264ef5065c09984d5e782ca65221f4ffeda",
    "0xe12fef77c3742ddd09766683ac074b5583b81e6cf53c9ab88854e856525d7962",
    "0xae27bd115272135af06c4a5247176f110a7f7844ed5f05a9b6f1c51a4d039752",
    "0x85aef506fcaca0065f94f5f13a35dc3bd497491c0b938810a24a8346249b8683",
    "0x24c3849e7fab8b7c04e9c6300a4ee627ef937c66791deb9ad9935fe05b51de56",
    "0x9cbb216f045fe75b08677c810bd5ec5e451d7e5d200a522a7d62987d73262383",
    "0xa7c1d53b1493be8e1805215e24e977f4ed28f20d4a7ad6d9cb8a3a92d8e4cb21",
  ];
  const account = "0x0166ebA0D68B8F82F1956670f9BE2b9C80e47Da9";
  const merkleTreeCid = "merkle tree cid";
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

  describe("claim", () => {
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

    it("success", async () => {
      await distributor.claim(1, 1, account, proof);
    });

    it("mint and transfer to account", async () => {
      await distributor.connect(alice).claim(1, 1, account, proof);
      expect((await distributor.balanceOf(account, 1)).toNumber()).to.equals(1);
    });

    it("emits event", async () => {
      const transaction = await distributor
        .connect(alice)
        .claim(1, 1, account, proof);
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
      expect(transferEvent.args.to).to.equal(account);
      expect(transferEvent.args.value).to.equal(1);
    });

    it("mint and transfer to proper account on multiple distribution", async () => {
      await distributor.connect(alice).claim(1, 1, account, proof);
      expect((await distributor.balanceOf(account, 1)).toNumber()).to.equals(1);
      await distributor
        .connect(alice)
        .claim(1, 2, "0x01C9Be969F4BC1bB8E28Ecb1c54e93D6Fd081BFd", [
          "0x2cb5eb248305fff043dc26a75f92477d2fb07c87156c51134f3951928c52f2fa",
          "0xb79e2fcd1eb3c06e422dee5f0aa4182f89f3bbf980095344ceb8d99bbdacb071",
          "0x33644d1b66f17a73996a7ee9ac1bebdf0345e0400fe5d949b65301a9a9436d05",
          "0x85aef506fcaca0065f94f5f13a35dc3bd497491c0b938810a24a8346249b8683",
          "0x24c3849e7fab8b7c04e9c6300a4ee627ef937c66791deb9ad9935fe05b51de56",
          "0x9cbb216f045fe75b08677c810bd5ec5e451d7e5d200a522a7d62987d73262383",
          "0xa7c1d53b1493be8e1805215e24e977f4ed28f20d4a7ad6d9cb8a3a92d8e4cb21",
        ]);
      expect(
        (
          await distributor.balanceOf(
            "0x01C9Be969F4BC1bB8E28Ecb1c54e93D6Fd081BFd",
            1
          )
        ).toNumber()
      ).to.equals(1);
      await distributor.connect(alice).claim(2, 1, account, proof);
      expect((await distributor.balanceOf(account, 2)).toNumber()).to.equals(1);
    });

    it("revert if already claimed", async () => {
      await distributor.connect(alice).claim(1, 1, account, proof);
      await expect(
        distributor.connect(alice).claim(1, 1, account, proof)
      ).to.be.revertedWith("MerkleTree: Already proven.");
    });

    it("revert if index is invalid", async () => {
      await expect(
        distributor.connect(alice).claim(1, 2, account, proof)
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if address is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(1, 1, "0x01C9Be969F4BC1bB8E28Ecb1c54e93D6Fd081BFd", proof)
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });

    it("revert if proof is invalid", async () => {
      await expect(
        distributor
          .connect(alice)
          .claim(1, 1, account, [
            "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
            "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
            "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
            "0x32c10051148c88559b11ac5fe1af4264ef5065c09984d5e782ca65221f4ffeda",
            "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
            "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
          ])
      ).to.be.revertedWith("MerkleTree: Invalid proof.");
    });
  });
});
