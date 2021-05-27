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

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const bscNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      process.env.BSC_RPC_URL
    );
  },
  network_id: 56,
  skipDryRun: true,
};

const tbscNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      process.env.TBSC_RPC_URL
    );
  },
  network_id: 97,
  skipDryRun: true,
};

const maticNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      process.env.MATIC_RPC_URL
    );
  },
  network_id: 137,
  skipDryRun: true,
  gas: 4000000,
  gasPrice: 1000000000, // 1 gwei
};

const mumbaiNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      process.env.MUMBAI_RPC_URL
    );
  },
  network_id: 80001,
  skipDryRun: true,
};

const xdaiNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      process.env.XDAI_RPC_URL
    );
  },
  network_id: 100,
  skipDryRun: true,
  gas: 4000000,
  gasPrice: 1000000000, // 1 gwei
};

const ropstenNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );
  },
  network_id: "3",
  skipDryRun: true,
};

const rinkebyNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );
  },
  network_id: "4",
  skipDryRun: true,
};

const kovanNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );
  },
  network_id: "42",
  skipDryRun: true,
};

const mainnetNetwork = {
  provider: () => {
    return new HDWalletProvider(
      process.env.PRIVATE_KEY,
      `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    );
  },
  // network_id: "1", // Use for verify contract on etherscan
  network_id: "*",
  // ~~Necessary due to https://github.com/trufflesuite/truffle/issues/1971~~
  // Necessary due to https://github.com/trufflesuite/truffle/issues/3008
  skipDryRun: true,
  timeoutBlocks: 500,
  gas: 4000000,
  gasPrice: 140000000000, // 140 gwei
};

module.exports = {
  networks: {
    local: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    bsc: bscNetwork,
    tbsc: tbscNetwork,
    matic: maticNetwork,
    mumbai: mumbaiNetwork,
    xdai: xdaiNetwork,
    ropsten: ropstenNetwork,
    rinkeby: rinkebyNetwork,
    kovan: kovanNetwork,
    mainnet: mainnetNetwork,
  },
  compilers: {
    solc: {
      version: "0.7.6",
    },
  },
  mocha: {
    timeout: 10000,
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
};
