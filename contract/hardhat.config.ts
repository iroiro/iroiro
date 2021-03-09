import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
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

export default config;
