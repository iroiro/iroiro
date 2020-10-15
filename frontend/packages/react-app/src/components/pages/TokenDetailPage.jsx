import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ethers } from "ethers"
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@project/contracts";
import TokenDetailePageTemplate from "../templates/TokenDetailPageTemplate"

const TokenDetailPage = () => {
  const [provider, setProvider] = useState();
  const [tokenAddress, setTokenAddress] = useState()
  const [token, setToken] = useState({name:"", symbol: "", totalSupply: 0, decimals: 0})
  const [stakingInfo, setStakingInfo] = useState({stakingAmount:"", earned: ""})
  const [stakeValue, handleStakeInput] = useState("")

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
    const balance = await fanToken.balanceOf(walletAddress)
    const creatorTokenRatio = await fanToken.creatorTokenRatio()
    const lockupPeriod = await fanToken.lockupPeriod()

    const staking = new Contract(addresses.Staking, abis.staking, provider)
    const isStakingPaused = await staking.tokensStakingPaused(tokenAddress)
    const stakingAmount = await staking.balanceOf(walletAddress, tokenAddress)
    
    let earned = ethers.BigNumber.from(0)
    if(!isStakingPaused || stakingAmount > 0) {
      earned = await staking.earned(walletAddress, tokenAddress, totalSupply, decimals)
    }

    const allowanceAmount = await fanToken.allowance(walletAddress, addresses.Staking)
    console.log(allowanceAmount.toNumber())

    const token = {
      address: tokenAddress,
      name: name,
      symbol: symbol,
      totalSupply: totalSupply.toNumber(),
      decimals: decimals,
      balance: balance.toNumber(),
      creatorTokenRatio: creatorTokenRatio,
      lockupPeriod: lockupPeriod,
    }

    const stakingInfo = {
      isStakingPaused: isStakingPaused,
      stakingAmount: stakingAmount.toNumber(),
      earned: earned.toNumber(),
      allowance: allowanceAmount.toNumber()
    }

    setToken(token)
    setStakingInfo(stakingInfo)
  }

  const withdrawStakingToken = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    const bgStakingAmount = await ethers.BigNumber.from(stakingInfo.stakingAmount)
    staking.withdraw(bgStakingAmount, address)
  }

  const claimEarnedToken = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    staking.claim(address)
  }

  const approve = async (address) => {
    if(stakeValue === "" || stakeValue == 0) {
      return
    }
    const signer = await provider.getSigner()
    const fanToken = new Contract(tokenAddress, abis.fanToken, signer)
    if(stakingInfo.allowance > 0) {
      fanToken.increaseAllowance(addresses.Staking, stakeValue)
    } else {
      fanToken.approve(addresses.Staking, stakeValue)
    }
  }

  const stakeToken = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    staking.stake(stakeValue, address)
  }

  return (
    <TokenDetailePageTemplate
      tokenAddress={tokenAddress}
      token={token}
      stakingInfo={stakingInfo}
      withdrawStakingToken={withdrawStakingToken}
      claimEarnedToken={claimEarnedToken}
      approve={approve}
      stakeToken={stakeToken}
      handleStakeInput={handleStakeInput}
      stakeValue={stakeValue}
    />
  );
}

export default TokenDetailPage