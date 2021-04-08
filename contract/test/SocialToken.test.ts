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
import { constants, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";
import { SocialToken } from "../types/SocialToken";

describe("SocialToken", () => {
  let owner: Signer, alice: Signer, bob: Signer;
  let socialToken: SocialToken;
  let aliceToken: SocialToken;

  beforeEach(async () => {
    const SocialToken: ContractFactory = await ethers.getContractFactory(
      "SocialToken"
    );
    [owner, alice, bob] = await ethers.getSigners();
    socialToken = (await SocialToken.deploy(
      "SocialToken",
      "SCL",
      await owner.getAddress()
    )) as SocialToken;
    aliceToken = (await SocialToken.deploy(
      "AliceToken",
      "ALC",
      await alice.getAddress()
    )) as SocialToken;
  });

  it("has a name", async () => {
    expect(await socialToken.name()).to.equal("SocialToken");
    expect(await aliceToken.name()).to.equal("AliceToken");
  });

  it("has a symbol", async () => {
    expect(await socialToken.symbol()).to.equal("SCL");
    expect(await aliceToken.symbol()).to.equal("ALC");
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
    ).to.equal(constants.WeiPerEther.mul("10000000"));
    expect(
      (await aliceToken.balanceOf(await alice.getAddress())).toString()
    ).to.equal(constants.WeiPerEther.mul("10000000"));
  });

  it("set decimals given as argument", async () => {
    expect((await socialToken.decimals()).toString()).to.equal("18");
    expect((await aliceToken.decimals()).toString()).to.equal("18");
  });
});
