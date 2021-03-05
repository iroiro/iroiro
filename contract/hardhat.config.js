require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");

module.exports = {
  solidity: "0.7.6",
  gasReporter: {
    excludeContracts: [
      "Migrations",
      "DistributorInterfaceV1",
      "ERC20",
      "ERC20Mock",
    ],
  },
};
