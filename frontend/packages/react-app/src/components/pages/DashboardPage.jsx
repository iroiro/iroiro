import React, { useCallback, useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@project/contracts";
import Dashboard from "../templates/DashboardPageTemplate"

const DashboardPage = () => {
  const [provider, setProvider] = useState();
  const [tokens , setTokensAddress] = useState([]);
  
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
    if(provider) {
      getTokenList()
    }
  },[provider])

  async function getTokenList() {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const tokenFactory = new Contract(addresses.TokenFactory, abis.tokenFactory, signer)
    const tokenAmount = await tokenFactory.tokenAmountOf(walletAddress)
    console.log(tokenAmount.toNumber())

    const tokenArray = []

    for (let i = 0; i < tokenAmount; i++) {
      const tokenAddress = await tokenFactory.creatorTokenOf(walletAddress, i+1)
      const fanToken = new Contract(tokenAddress, abis.fanToken, signer)
      const name = await fanToken.name()
      const symbol = await fanToken.symbol()

      const vesting = new Contract(addresses.Vesting, abis.vesting, signer)
      const vestingAmount = await vesting.remainingAmount(tokenAddress)
      const redeemableAmount = await vesting.redeemableAmount(tokenAddress)
      
      const staking = new Contract(addresses.Staking, abis.staking, signer)
      const isStakingPaused = await staking.tokensStakingPaused(tokenAddress)

      const tokenInfo = {
        address: tokenAddress,
        name: name,
        symbol: symbol,
        vestingAmount: vestingAmount.toNumber(),
        redeemableAmount: redeemableAmount.toNumber(),
        isStakingPaused: isStakingPaused,
      }
      tokenArray.push(tokenInfo)
    }
    setTokensAddress(tokenArray)
  }

  const withdrawToken = async (address) => {
    const signer = await provider.getSigner()
    const vesting = new Contract(addresses.Vesting, abis.vesting, signer)
    vesting.redeem(address)
  }

  const restartStaking = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    staking.resumeStakingOf(address)
  }

  const stopStaking = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    staking.pauseStakingOf(address)
  }

  return (
    <div>
      <Dashboard
        provider={provider} 
        loadWeb3Modal={loadWeb3Modal}
        tokens={tokens}
        withdrawToken={withdrawToken}
        restartStaking={restartStaking}
        stopStaking={stopStaking}
      />
    </div>
  );
}

export default DashboardPage
