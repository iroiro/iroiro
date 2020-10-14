import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import { Contract } from "@ethersproject/contracts";
import { abis } from "@project/contracts";
import TokenDetailePageTemplate from "../templates/TokenDetailPageTemplate"

const TokenDetailPage = () => {
  const [provider, setProvider] = useState();
  const [tokenAddress, setTokenAddress] = useState()
  const [token, setToken] = useState({name:"", symbol: "", totalSupply: 0, decimals: 0})
  const params = useParams()
  
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    setTokenAddress(params.address)
    if(provider && tokenAddress) {
      getTokenInfo()
    }
  },[provider, tokenAddress])

  const getTokenInfo = async () => {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const fanToken = new Contract(tokenAddress, abis.fanToken, provider)
    const name = await fanToken.name()
    const symbol = await fanToken.symbol()
    const totalSupply = await fanToken.totalSupply()
    const decimals = await fanToken.decimals()
    const token = {
      address: tokenAddress,
      name: name,
      symbol: symbol,
      totalSupply: totalSupply.toNumber(),
      decimals: decimals
    }
    setToken(token)
  }

  return (
    <TokenDetailePageTemplate
      tokenAddress={tokenAddress}
      token={token}
    />
  );
}

export default TokenDetailPage