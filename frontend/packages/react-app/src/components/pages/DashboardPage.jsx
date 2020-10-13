import React, {useCallback, useEffect, useState} from "react"
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import Dashboard from "../templates/Dashboard"

const DashboardPage = () => {
  const [provider, setProvider] = useState();
  const [path , setPath] = useState("");
  const [name , setName] = useState("");
  const [vestingAmount , setVestingAmount] = useState("");
  const [tokens , setTokensAddress] = useState([]);
  
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      console.log("aa")
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);
  
  useEffect(() => {
    if(provider) {
      getTokenList()
    }
  },[provider])

  async function getTokenList() {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    console.log(walletAddress)
    const tokenFactory = new Contract(addresses.TokenFactory, abis.tokenFactory, signer)
    const tokenAmount = await tokenFactory.tokenAmountOf(walletAddress)
    console.log(tokenAmount.toNumber())

    for (let i = 0; i < tokenAmount; i++) {
      const tokenAddress = await tokenFactory.creatorTokenOf(walletAddress, i)
      tokens.push(tokenAddress)
      setTokensAddress(tokens)
    }
  }

  return (
    <div>
      <Dashboard
        provider={provider} 
        loadWeb3Modal={loadWeb3Modal}
        path={path}
        name={name}
        vestingAmount={vestingAmount}
      />
    </div>
  );
}

export default DashboardPage
