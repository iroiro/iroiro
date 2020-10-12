import React, {useEffect, useState} from "react"
import { ethers } from "ethers"
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";

const ExplorePage = () => {

  const [name, setName] = useState()
  const [symbol, setSymbol] = useState()
  const [balanceToEther, setBalance] = useState()

  useEffect(() => {
    getTokenList();
  }, []);
  
  async function getTokenList() {
    const defaultProvider = getDefaultProvider("wss://ropsten.infura.io/ws/v3/459b18e59dc6427b8ca35ef8f1d9c17f");
    const WEENUS = new Contract(addresses.WEENUS, abis.erc20, defaultProvider);
    const name = await WEENUS.name();
    const symbol = await WEENUS.symbol();
    const tokenBalance = await WEENUS.balanceOf("0x4B8619890fa9C3cF11C497961eB4b970D440127F");
    const balanceToEther = await ethers.utils.formatEther(tokenBalance)
    setName(name)
    setSymbol(symbol)
    setBalance(balanceToEther)
  }

  return (
    <ExplorePageTemplate
      name={name}
      balance={balanceToEther}
      symbol={symbol}
    />
  );
}

export default ExplorePage
