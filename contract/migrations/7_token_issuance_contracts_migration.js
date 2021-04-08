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

const web3 = require("web3");
const TreasuryVester = artifacts.require("TreasuryVester");
const TokenFactory = artifacts.require("TokenFactory");

const operator = process.env.OPERATOR_ADDRESS;
const donatee = process.env.DONATEE_ADDRESS;
const creatorFund = process.env.CREATOR_FUND_ADDRESS;

module.exports = async (deployer) => {
  if (operator === "" || donatee === "" || creatorFund === "") {
    throw Error("Invalid address");
  }
  let vesting;
  await deployer
    .deploy(TreasuryVester)
    .then((instance) => {
      vesting = instance;
      return deployer.deploy(
        TokenFactory,
        operator,
        donatee,
        creatorFund,
        vesting.address
      );
    })
    .then((instance) => {
      const tokenFactory = instance;
      vesting.transferOwnership(tokenFactory.address);
      return tokenFactory;
    });
};
