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

const { expect } = require("chai");

const Campaign = artifacts.require("CampaignInterfaceV1");
const ERC20Mock = artifacts.require("ERC20Mock");

contract("CampaignInterfaceV1", (accounts) => {
  const [owner, alice, link] = accounts;

  beforeEach(async () => {
    this.abctoken = await ERC20Mock.new("ABCToken", "ABC", owner, 1000000000, {
      from: owner,
    });
    this.campaign = await Campaign.new(
      this.abctoken.address,
      100000,
      { from: owner }
    );
  });

  describe("constructor", async () => {
    it("has a state variables", async () => {
      expect((await this.campaign.claimedNum()).toString()).to.be.equal("0");
    });
  });
});
