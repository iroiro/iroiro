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

const { LinkToken } = require("@chainlink/contracts/truffle/v0.4/LinkToken");
const { Oracle } = require("@chainlink/contracts/truffle/v0.6/Oracle");

module.exports = async (deployer, network, [defaultAccount]) => {
  if (network.startsWith("rinkeby")) {
    Oracle.setProvider(deployer.provider);
    try {
      await deployer.deploy(
        Oracle,
        "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
        { from: defaultAccount }
      );
    } catch (err) {
      console.error(err);
    }
  } else if (network.startsWith("kovan")) {
    Oracle.setProvider(deployer.provider);
    try {
      await deployer.deploy(
        Oracle,
        "0xa36085F69e2889c224210F603D836748e7dC0088",
        { from: defaultAccount }
      );
    } catch (err) {
      console.error(err);
    }
    // Local (development) networks need their own deployment of the LINK
    // token and the Oracle contract
  } else if (!network.startsWith("live")) {
    LinkToken.setProvider(deployer.provider);
    Oracle.setProvider(deployer.provider);
    try {
      await deployer
        .deploy(LinkToken, { from: defaultAccount })
        .then(() => {
          return deployer.deploy(Oracle, LinkToken.address, {
            from: defaultAccount,
          });
        })
        .then((oracle) => {
          oracle.setFulfillmentPermission(LinkToken.address, true, {
            from: defaultAccount,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    // Do nothing.
  }
};
