import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-gas-reporter";
import { TokenFactory } from "./types";
import * as dotenv from "dotenv";
import { assert } from "chai";

dotenv.config();

const projectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.PRIVATE_KEY;

task("create-exclusive-token", "Prints an account's balance")
  .addParam<string>("factoryAddress", "The address of token factory contract")
  .addParam<string>("creatorAddress", "The address of creator")
  .addParam<string>("name", "The name of new token")
  .addParam<string>("symbol", "The symbol of new token")
  .addParam<number>(
    "operationRatio",
    "Amount ratio of token transferred to operator. Input with decimal 2."
  )
  .addParam<number>(
    "donateeRatio",
    "Amount ratio of token transferred to donatee. Input with decimal 2."
  )
  .addParam<number>(
    "creatorFundRatio",
    "Amount ratio of token transferred to creator fund. Input with decimal 2."
  )
  .addParam<number>("vestingYears", "Vesting years. Input with decimal 0.")
  .setAction(async (taskArgs, { ethers }) => {
    if (
      taskArgs.operationRatio > 10000 ||
      taskArgs.donationRatio > 10000 ||
      taskArgs.creatorFundRatio > 10000
    ) {
      throw Error("Invalid arg.");
    }
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = (await TokenFactory.attach(
      taskArgs.factoryAddress
    )) as TokenFactory;

    const tx = await tokenFactory.createExclusiveToken(
      taskArgs.creatorAddress,
      taskArgs.name,
      taskArgs.symbol,
      taskArgs.operationRatio,
      taskArgs.donateeRatio,
      taskArgs.creatorFundRatio,
      taskArgs.vestingYears
    );
    console.debug("Transaction hash: ", tx.hash);
    const receipt = await tx.wait();
    if (receipt.events === undefined) {
      assert.fail();
    }
    const transferEvent = receipt.events.find(
      (event) => event.event === "CreateToken"
    );
    if (transferEvent === undefined || transferEvent.args === undefined) {
      assert.fail();
    }
    const token = transferEvent.args.token;
    console.debug("New creator token created at: ", token);
  });

const config: HardhatUserConfig = {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      gasPrice: 1,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: Number.parseInt(process.env?.FORK_BLOCKNUMBER ?? "0"),
      },
    },
    mainnet: {
      gasPrice: 15000000000, // 15 gwei
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey ?? ""],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey ?? ""],
    },
  },
  gasReporter: {
    excludeContracts: [
      "Migrations",
      "DistributorInterfaceV1",
      "ERC20",
      "ERC20Mock",
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
