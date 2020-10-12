import React, {useCallback, useEffect, useState} from "react"
import { ethers } from "ethers"
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";

const ExplorePage = () => {
  
  const [provider, setProvider] = useState();
  const [name, setName] = useState()
  const [symbol, setSymbol] = useState()
  const [balanceToEther, setBalance] = useState()
 
  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

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
      provider={provider} 
      loadWeb3Modal={loadWeb3Modal}
      name={name}
      balance={balanceToEther}
      symbol={symbol}
    />
  );
}

export default ExplorePage
