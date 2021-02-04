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

const MyContract = artifacts.require("MyContract");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");

/*
  This script is meant to assist with funding the requesting
  contract with LINK. It will send 1 LINK to the requesting
  contract for ease-of-use. Any extra LINK present on the contract
  can be retrieved by calling the withdrawLink() function.
*/

const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || "1000000000000000000";

module.exports = async (callback) => {
  try {
    const mc = await MyContract.deployed();
    const tokenAddress = await mc.getChainlinkToken();
    const token = await LinkTokenInterface.at(tokenAddress);
    console.log("Funding contract:", mc.address);
    const tx = await token.transfer(mc.address, payment);
    callback(tx.tx);
  } catch (err) {
    callback(err);
  }
};
