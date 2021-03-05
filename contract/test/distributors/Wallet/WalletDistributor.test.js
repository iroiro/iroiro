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

describe("WalletDistributor", () => {
  let owner, alice;

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

  beforeEach(async () => {
    const Distributor = await ethers.getContractFactory("WalletDistributor");
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
        expect(await this.distributor.token("1")).to.equal(
          this.abctoken.address
        );
      });

      it("has a merkle root", async () => {
        expect(await this.distributor.merkleRoot("1")).to.equal(merkleRoot);
      });

      it("has a remaining map", async () => {
        expect(await this.distributor.remainingAmount("1")).to.equal(100);
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
        expect(claimEvent.args.merkleTreeCid).to.equal(merkleTreeCid);
        expect(claimEvent.args.campaignInfoCid).to.equal(campaignInfoCid);
      });
    });

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

  it("transfer allowance", async () => {
    await this.abctoken.approve(this.distributor.address, 100);
    receipt = await this.distributor.createCampaign(
      merkleRoot,
      this.abctoken.address,
      merkleTreeCid,
      campaignInfoCid,
      50
    );
    expect(await this.distributor.remainingAmount("1")).to.equal(50);
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
        await this.distributor.claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      });

      it("emits event", async () => {
        const receipt = await this.distributor
          .connect(alice)
          .claim(
            1,
            1,
            "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
            BigNumber.from(100),
            proof
          );
        const result = await receipt.wait();
        const claimEvent = result.events.find(
          (event) => event.event === "Claimed"
        );
        expect(claimEvent.args.campaignId).to.equal(1);
        expect(claimEvent.args.index).to.equal(1);
        expect(claimEvent.args.account).to.equal(
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1"
        );
        expect(claimEvent.args.amount).to.equal(100);
      });

      it("revert if index is invalid", async () => {
        await expect(
          this.distributor
            .connect(alice)
            .claim(
              1,
              2,
              "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
              BigNumber.from(100),
              proof
            )
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if address is invalid", async () => {
        await expect(
          this.distributor
            .connect(alice)
            .claim(
              1,
              1,
              "0x01dc7f8c928cea27d8ff928363111c291beb20b2",
              BigNumber.from(100),
              proof
            )
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if amount is invalid", async () => {
        await expect(
          this.distributor
            .connect(alice)
            .claim(
              1,
              1,
              "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
              BigNumber.from(10),
              [
                "0xb2edb7e841c03b8394638ba04b3bd2e9769b0d29586a4d476bf71d84e1612b46",
                "0x0f2293d2199b068a92bd8359ac7f189a4ac49c6aaefcfefdbd3b24fae3ffc198",
                "0x6bea169605062ad96694d33c2918b3a12ffae68cb4a2238921f37e37e2640c0b",
                "0x356bdf6769a352b886c6f54b3e003a35e0ec7de615121d9544c3bdc5779f457d",
                "0xf8cb76a9be4588036a88209807d0293ca1a0d7dd100c1bfac881bdb8fa6302c5",
                "0xb13a9406568e667caa70cc8b271c9ada0ff7b8ce4ebe5e6889e07632db66809e",
                "0x3f10ffaf7f1fed0a776fe6b06f4e4a0562ea6996baa71ae99a1a78ff5af467dd",
              ]
            )
        ).to.be.revertedWith("MerkleDistributor: Invalid proof.");
      });

      it("revert if proof is invalid", async () => {
        await expect(
          this.distributor
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
          (
            await this.abctoken.balanceOf(
              "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1"
            )
          ).toString()
        ).to.equal("0");
        await this.distributor.claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
        expect(
          (await this.abctoken.balanceOf(this.distributor.address)).toString()
        ).to.equal("0");
        expect(
          (
            await this.abctoken.balanceOf(
              "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1"
            )
          ).toString()
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
        await this.distributor.claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
        await this.distributor.claim(
          2,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
      });

      it("decrease remaining map", async () => {
        await this.distributor.claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
        expect(await this.distributor.remainingAmount("1")).to.equal(0);
        expect(await this.distributor.remainingAmount("2")).to.equal(100);
        await this.distributor.claim(
          2,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
        expect(await this.distributor.remainingAmount("1")).to.equal(0);
        expect(await this.distributor.remainingAmount("2")).to.equal(0);
      });

      it("claim does not use other campaign's tokens", async () => {
        await this.distributor.claim(
          1,
          1,
          "0x01dC7F8C928CeA27D8fF928363111c291bEB20b1",
          BigNumber.from(100),
          proof
        );
        await expect(
          this.distributor.claim(
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
          )
        ).to.be.revertedWith("MerkleDistributor: Insufficient token.");
      });
    });
  });
});
