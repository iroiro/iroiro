// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { SingleSocialToken__factory } from "../types";

const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  if (
    process.env.TOKEN_NAME === undefined ||
    process.env.TOKEN_NAME === "" ||
    process.env.TOKEN_SYMBOL === undefined ||
    process.env.TOKEN_SYMBOL === "" ||
    process.env.CREATOR_ADDRESS === undefined ||
    process.env.CREATOR_ADDRESS === "" ||
    process.env.OPERATOR_ADDRESS === undefined ||
    process.env.OPERATOR_ADDRESS === ""
  ) {
    console.error("Invalid arg");
    return;
  }

  // We get the contract to deploy
  const SingleSocialToken: SingleSocialToken__factory = (await hre.ethers.getContractFactory(
    "SingleSocialToken"
  )) as SingleSocialToken__factory;
  const token = await SingleSocialToken.deploy(
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    "https://ipfs.io/ipfs/",
    process.env.CREATOR_ADDRESS,
    process.env.OPERATOR_ADDRESS,
    2000
  );

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
