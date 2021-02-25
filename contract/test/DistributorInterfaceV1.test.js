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

const { accounts, contract } = require("@openzeppelin/test-environment");
const { constants } = require("@openzeppelin/test-helpers");
const { assert, expect } = require("chai");

const Distributor = contract.fromArtifact("DistributorInterfaceV1");
const ERC20Mock = contract.fromArtifact("ERC20Mock");

describe("DistributorInterfaceV1", () => {
  const [owner, alice] = accounts;

  beforeEach(async () => {
    this.distributor = await Distributor.new("distributor info cid", {
      from: owner,
    });
    this.abctoken = await ERC20Mock.new("ABCToken", "ABC", owner, 1000000000, {
      from: owner,
    });
    this.xyztoken = await ERC20Mock.new("XYZToken", "XYZ", owner, 1000000000, {
      from: owner,
    });
  });

  it("has a cid", async () => {
    expect(await this.distributor.distributorInfoCid()).to.equal(
      "distributor info cid"
    );
  });
});
