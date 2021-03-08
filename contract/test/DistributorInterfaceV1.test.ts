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
import { Contract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";

describe("DistributorInterfaceV1", () => {
  let owner: Signer;
  let distributor: Contract;
  let abctoken: Contract;

  beforeEach(async () => {
    const Distributor: ContractFactory = await ethers.getContractFactory(
      "DistributorInterfaceV1"
    );
    const Token: ContractFactory = await ethers.getContractFactory("ERC20Mock");
    [owner] = await ethers.getSigners();
    distributor = await Distributor.deploy("distributor info cid");
    abctoken = await Token.deploy(
      "ABCToken",
      "ABC",
      await owner.getAddress(),
      1000000000
    );
  });

  it("has a cid", async () => {
    expect(await distributor.distributorInfoCid()).to.equal(
      "distributor info cid"
    );
  });

  it("create campaign do nothing", async () => {
    await distributor.createCampaign(
      "0x33e954d45e481a7c78be8cb27f39277113b2519ef0c0d237ab91a054d4bc4f7a",
      abctoken.address,
      "merkle tree cid",
      "campaign info cid",
      100
    );
  });
});
