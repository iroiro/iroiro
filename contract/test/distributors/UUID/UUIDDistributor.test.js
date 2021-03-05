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

const { BigNumber } = require("ethers");
const { expect } = require("chai");

describe("UUIDDistributor", () => {
  let owner, alice;

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
  const merkleTreeCid = "merkle tree cid";
  const campaignInfoCid = "campaign info cid";

  beforeEach(async () => {
    const Distributor = await ethers.getContractFactory("UUIDDistributor");
    const Token = await ethers.getContractFactory("ERC20Mock");

    [owner, alice] = await ethers.getSigners();
    this.distributor = await Distributor.deploy("distributor info cid");
    this.abctoken = await Token.deploy(
      "ABCToken",
      "ABC",
      owner.address,
      1000000000
    );
    this.xyztoken = await Token.deploy(
      "XYZToken",
      "XYZ",
      owner.address,
      1000000000
    );
  });

  describe("createCampaign", () => {
    let receipt;
    describe("success case", () => {
      beforeEach(async () => {
        await this.abctoken.approve(this.distributor.address, 100);
        receipt = await this.distributor.createCampaign(
          merkleRoot,
          this.abctoken.address,
          merkleTreeCid,
          campaignInfoCid,
          100
        );
      });

      it("has a token address", async () => {
        expect(await this.distributor.tokenMap("1")).to.equal(
          this.abctoken.address
        );
      });

      it("has a merkle root", async () => {
        expect(await this.distributor.merkleRootMap("1")).to.equal(merkleRoot);
      });

      it("has a merkle tree cid", async () => {
        expect(await this.distributor.merkleTreeCidMap("1")).to.equal(
          merkleTreeCid
        );
      });

      it("has a campaign info cid", async () => {
        expect(await this.distributor.campaignInfoCidMap("1")).to.equal(
          campaignInfoCid
        );
      });

      it("transfers token of approved amount", async () => {
        expect(
          (await this.abctoken.balanceOf(this.distributor.address)).toString()
        ).to.equal("100");
      });

      it("increment next campaign id", async () => {
        expect((await this.distributor.nextCampaignId()).toString()).to.equal(
          "2"
        );
      });

      it("emits event", async () => {
        const result = await receipt.wait();
        const claimEvent = result.events.find(
          (event) => event.event === "CreateCampaign"
        );
        expect(claimEvent.args.campaignId).to.equal("1");
        expect(claimEvent.args.token).to.equal(this.abctoken.address);
        expect(claimEvent.args.creator).to.equal(owner.address);
      });
    });

    xit("transfer allowance", () => {});

    describe("failed case", () => {
      it("revert when allowance is insufficient", async () => {
        await this.abctoken.approve(this.distributor.address, 99);
        await expect(
          this.distributor.createCampaign(
            merkleRoot,
            this.abctoken.address,
            merkleTreeCid,
            campaignInfoCid,
            100
          )
        ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
      });
    });
  });

  describe("claim", () => {
    beforeEach(async () => {
      await this.abctoken.approve(this.distributor.address, 100);
      await this.distributor.createCampaign(
        merkleRoot,
        this.abctoken.address,
        merkleTreeCid,
        campaignInfoCid,
        100
      );
    });

    describe("active campaign", () => {
      it("claim", async () => {
        await this.distributor.claim(1, 1, hashed, BigNumber.from(100), proof);
      });

      it("increment claimedNum", async () => {
        const claimedNumBefore = await this.distributor.claimedNum();
        expect(claimedNumBefore).to.equal(BigNumber.from(0));
        await this.distributor.claim(1, 1, hashed, BigNumber.from(100), proof);
        const claimedNumAfter = await this.distributor.claimedNum();
        expect(claimedNumAfter).to.equal(BigNumber.from(1));
      });

      it("emits event", async () => {
        const receipt = await this.distributor
          .connect(alice)
          .claim(1, 1, hashed, BigNumber.from(100), proof);
        const result = await receipt.wait();
        const claimEvent = result.events.find(
          (event) => event.event === "Claim"
        );
        expect(claimEvent.args.from).to.equal(alice.address);
        expect(claimEvent.args.to).to.equal(alice.address);
      });

      it("revert if index is invalid", async () => {
        await expect(
          this.distributor.claim(1, 2, hashed, BigNumber.from(100), proof)
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if hash is invalid", async () => {
        await expect(
          this.distributor.claim(
            1,
            1,
            "00a89857cb180be7b0cc2a6db58b35e69a4c54aa7990bda230f527595e280285",
            BigNumber.from(100),
            proof
          )
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if amount is invalid", async () => {
        await expect(
          this.distributor
            .connect(alice)
            .claim(1, 1, hashed, BigNumber.from(10), [
              "0xb2edb7e841c03b8394638ba04b3bd2e9769b0d29586a4d476bf71d84e1612b46",
              "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
              "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
              "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
              "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
              "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
              "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
            ])
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if proof is invalid", async () => {
        await expect(
          this.distributor
            .connect(alice)
            .claim(1, 1, hashed, BigNumber.from(100), [
              "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
              "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
              "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
              "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
              "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
              "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
            ])
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });
    });
  });

  describe("multiple campaign", () => {
    describe("different tokens", () => {
      beforeEach(async () => {
        await this.abctoken.approve(this.distributor.address, 100);
        await this.xyztoken.approve(this.distributor.address, 100);
        await this.distributor.createCampaign(
          merkleRoot,
          this.abctoken.address,
          merkleTreeCid,
          campaignInfoCid,
          100
        );
        await this.distributor.createCampaign(
          merkleRoot,
          this.xyztoken.address,
          merkleTreeCid,
          campaignInfoCid,
          100
        );
      });

      it("send proper token when user claimed", async () => {
        expect(
          (await this.abctoken.balanceOf(alice.address)).toString()
        ).to.equal("0");
        await this.distributor
          .connect(alice)
          .claim(1, 1, hashed, BigNumber.from(100), proof);
        expect(
          (await this.abctoken.balanceOf(this.distributor.address)).toString()
        ).to.equal("0");
        expect(
          (await this.abctoken.balanceOf(alice.address)).toString()
        ).to.equal("100");
        expect(
          (await this.xyztoken.balanceOf(this.distributor.address)).toString()
        ).to.equal("100");
      });
    });

    describe("same tokens", () => {
      beforeEach(async () => {
        await this.abctoken.approve(this.distributor.address, 100);
        await this.distributor.createCampaign(
          merkleRoot,
          this.abctoken.address,
          merkleTreeCid,
          campaignInfoCid,
          100
        );
        await this.abctoken.approve(this.distributor.address, 100);
        await this.distributor.createCampaign(
          merkleRoot,
          this.abctoken.address,
          merkleTreeCid,
          campaignInfoCid,
          100
        );
      });

      it("balance is summed up", async () => {
        expect(
          (await this.abctoken.balanceOf(this.distributor.address)).toString()
        ).to.equal("200");
      });

      it("claim use each campaign token", async () => {
        await this.distributor.claim(1, 1, hashed, BigNumber.from(100), proof);
        await this.distributor.claim(2, 1, hashed, BigNumber.from(100), proof);
      });

      it("claim does not use other campaign's tokens", async () => {
        await this.distributor.claim(1, 1, hashed, BigNumber.from(100), proof);
        await expect(
          this.distributor.claim(1, 2, hashed, BigNumber.from(100), [
            "0xd77db87087a1cd0a89b7eb04e0c180dbca03f46b1aed7618dd8c1520ed20969e",
            "0x1aa7eb3923684d4f0213dcf513ed8a529cdf8f0fb89901a3dc0ed1a883e30460",
            "0x3bbb656f8ba0de770b2c6743036f7e1c6e9b4f51813d07d396bd308b97a01d67",
            "0xdcfc4ba455ccfc71da6d8d97e2e4ce6205a172176133e612c115d623d9dc4592",
            "0x9446c03efafeb100f8d8546268672a191df7ff9d270e5f8aa9b74a38716252d2",
            "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
            "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
          ])
        ).to.be.revertedWith("MerkleDistributor: Insufficient token.");
      });
    });
  });
});
