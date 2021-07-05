// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { SingleTreasuryVester__factory } from "../types";
import { ethers } from "ethers";

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
    process.env.SINGLE_TOKEN_ADDRESS === undefined ||
    process.env.SINGLE_TOKEN_ADDRESS === "" ||
    process.env.CREATOR_ADDRESS === undefined ||
    process.env.CREATOR_ADDRESS === ""
  ) {
    console.error("Invalid arg");
    return;
  }

  // We get the contract to deploy
  const SingleTreasuryVester: SingleTreasuryVester__factory = (await hre.ethers.getContractFactory(
    "SingleTreasuryVester"
  )) as SingleTreasuryVester__factory;
  const token = await SingleTreasuryVester.deploy(
    process.env.SINGLE_TOKEN_ADDRESS,
    process.env.CREATOR_ADDRESS,
    ethers.utils.parseEther("7500000"),
    3
  );

  await token.deployed();

  console.log("TreasuryVester deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
