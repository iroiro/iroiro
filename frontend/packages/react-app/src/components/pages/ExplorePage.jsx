import React, {useCallback, useEffect, useState} from "react"
import { Web3Provider} from "@ethersproject/providers";
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";

const ExplorePage = () => {
  const [provider, setProvider] = useState()
  const [tokens, setTokens] = useState([])

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
    if(provider) {
      getTokenList();
    }
  }, [provider]);
    
  async function getTokenList() {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const tokenFactory = new Contract(addresses.TokenFactory, abis.tokenFactory, provider)
    const totalTokenCount = await tokenFactory.totalTokenCount()
    const numTotalToken = totalTokenCount.toNumber()
    
    let tokens = []
    for(let i = 0; i < numTotalToken; i++) {
      const tokenAddress = await tokenFactory.tokenOf(i+1)
      const fanToken = new Contract(tokenAddress, abis.fanToken, provider)
      const balance = await fanToken.balanceOf(walletAddress)
      const numBalance = balance.toNumber()
      if(numBalance > 0) {
        const name = await fanToken.name()
        const symbol = await fanToken.symbol()
        const token = {
          address: tokenAddress,
          name: name,
          symbol: symbol,
          balance: numBalance,
        }
        tokens.push(token)
      }
    }
    setTokens(tokens)
  }

  return (
    <ExplorePageTemplate
      provider={provider} 
      loadWeb3Modal={loadWeb3Modal}
      tokens={tokens}
    />
  );
}

export default ExplorePage
