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

import { expect } from "chai";
import { constants, Signer } from "ethers";
import { ethers } from "hardhat";
import { SingleSocialToken, SingleSocialToken__factory } from "../../types";
import assert from "assert";

describe("SingleSocialToken", () => {
  let owner: Signer, alice: Signer, bob: Signer;
  let creator: Signer;
  let operator: Signer;
  let socialToken: SingleSocialToken;
  let aliceToken: SingleSocialToken;
  let baseURI = "https://example.com/base/";
  let manifestCid = "manifestoCid";

  beforeEach(async () => {
    const SingleSocialToken: SingleSocialToken__factory = (await ethers.getContractFactory(
      "SingleSocialToken"
    )) as SingleSocialToken__factory;
    [owner, alice, bob, creator, operator] = await ethers.getSigners();
    socialToken = (await SingleSocialToken.deploy(
      "SocialToken",
      "SCL",
      baseURI,
      await creator.getAddress(),
      await operator.getAddress(),
      2000
    )) as SingleSocialToken;

    aliceToken = (await SingleSocialToken.deploy(
      "AliceToken",
      "ALC",
      baseURI,
      await creator.getAddress(),
      await operator.getAddress(),
      3000
    )) as SingleSocialToken;
  });

  it("has a name", async () => {
    expect(await socialToken.name()).to.equal("SocialToken");
    expect(await aliceToken.name()).to.equal("AliceToken");
  });

  it("has a symbol", async () => {
    expect(await socialToken.symbol()).to.equal("SCL");
    expect(await aliceToken.symbol()).to.equal("ALC");
  });

  it("decimal is 18", async () => {
    expect(await socialToken.decimals()).to.equal(18);
    expect(await aliceToken.decimals()).to.equal(18);
  });

  it("set base uri", async () => {
    expect(await socialToken.manifestoURI()).to.equal(
      "https://example.com/base/"
    );
  });

  it("mints a token", async () => {
    expect((await socialToken.totalSupply()).toString()).to.equal(
      constants.WeiPerEther.mul("10000000")
    );
    expect((await aliceToken.totalSupply()).toString()).to.equal(
      constants.WeiPerEther.mul("10000000")
    );
  });

  it("transferred a token to address", async () => {
    expect(
      (await socialToken.balanceOf(await owner.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("0"));
    expect(
      (await socialToken.balanceOf(await creator.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("2000000"));
    expect(
      (await socialToken.balanceOf(await operator.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("8000000"));

    expect(
      (await aliceToken.balanceOf(await owner.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("0"));
    expect(
      (await aliceToken.balanceOf(await creator.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("3000000"));
    expect(
      (await aliceToken.balanceOf(await operator.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("7000000"));
  });

  describe("updateBaseURI", () => {
    it("update base URI", async () => {
      await socialToken.updateBaseURI("https://example.com/updated/");
      expect(await socialToken.manifestoURI()).to.equals(
        "https://example.com/updated/"
      );
    });
  });

  describe("setManifestoCid", () => {
    it("set manifesto cid", async () => {
      await socialToken.setManifestoCid("newManifestoCid");
      expect(await socialToken.manifestoURI()).to.equals(
        "https://example.com/base/newManifestoCid"
      );
    });

    it("emit event", async () => {
      const tx = await socialToken.setManifestoCid(manifestCid);
      const receipt = await tx.wait();
      expect(receipt.events?.length).to.equal(1);
      if (
        receipt.events === undefined ||
        receipt.events[0].args === undefined
      ) {
        assert.fail();
      }
      expect(receipt.events[0].args.cid).to.equal(manifestCid);
    });
  });

  describe("manifesto URI", () => {
    it("returns manifesto URI", async () => {
      expect(await socialToken.manifestoURI()).to.equals(
        "https://example.com/base/"
      );
      await socialToken.setManifestoCid(manifestCid);
      expect(await socialToken.manifestoURI()).to.equals(
        "https://example.com/base/manifestoCid"
      );
    });
  });
});
