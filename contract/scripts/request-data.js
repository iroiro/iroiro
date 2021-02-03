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

/*
  This script allows for a Chainlink request to be created from
  the requesting contract. Defaults to the Chainlink oracle address
  on this page: https://docs.chain.link/docs/testnet-oracles
*/

const oracleAddress =
  process.env.TRUFFLE_CL_BOX_ORACLE_ADDRESS ||
  "0xc99B3D447826532722E41bc36e644ba3479E4365";
const jobId =
  process.env.TRUFFLE_CL_BOX_JOB_ID || "3cff0a3524694ff8834bda9cf9c779a1";
const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || "1000000000000000000";
const url =
  process.env.TRUFFLE_CL_BOX_URL ||
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
const path = process.env.TRUFFLE_CL_BOX_JSON_PATH || "USD";
const times = process.env.TRUFFLE_CL_BOX_TIMES || "100";

module.exports = async (callback) => {
  const mc = await MyContract.deployed();
  console.log("Creating request on contract:", mc.address);
  const tx = await mc.createRequestTo(
    oracleAddress,
    web3.utils.toHex(jobId),
    payment,
    url,
    path,
    times
  );
  callback(tx.tx);
};
