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

describe("tIRO", function () {
  let owner, alice, bob, testToken, tIRO;

  beforeEach(async () => {
    tIRO = await ethers.getContractFactory("tIRO");
    [owner, alice, bob] = await ethers.getSigners();
    testToken = await tIRO.deploy();
  });

  it("has a name", async () => {
    expect(await testToken.name()).to.equal("testIroiro");
  });

  it("has a symbol", async () => {
    expect(await testToken.symbol()).to.equal("tIRO");
  });

  it("mints a token", async () => {
    expect((await testToken.totalSupply()).toString()).to.equal(
      "1000000000000000000000000"
    );
  });

  it("transferred a token to creator", async () => {
    expect((await testToken.balanceOf(owner.address)).toString()).to.equal(
      "1000000000000000000000000"
    );
  });

  it("set decimals given as argument", async () => {
    expect((await testToken.decimals()).toString()).to.equal("18");
  });

  it("everybody can mint a token", async () => {
    await testToken.connect(alice).mint(alice.address);
    expect((await testToken.balanceOf(alice.address)).toString()).to.equal(
      "1000000000000000000000"
    );
  });

  it("Sending a 0 value transaction will give sender tokens.", async () => {
    await bob.sendTransaction({
      to: testToken.address,
    });
    expect((await testToken.balanceOf(bob.address)).toString()).to.equal(
      "1000000000000000000000"
    );
  });
});
