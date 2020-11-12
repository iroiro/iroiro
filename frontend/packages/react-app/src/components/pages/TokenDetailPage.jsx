import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {ethers} from "ethers"
import {Web3Provider} from "@ethersproject/providers";
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import TokenDetailePageTemplate from "../templates/TokenDetailPageTemplate"
import {GET_ACCOUNT_TOKEN} from "../../graphql/subgraph";
import {useLazyQuery} from "@apollo/react-hooks";

const TokenDetailPage = () => {
  const [provider, setProvider] = useState();
  const [walletAddress, setWalletAddress] = useState("")
  const [token, setToken] = useState({name: "", symbol: "", totalSupply: 0, decimals: 0})
  const [stakingInfo, setStakingInfo] = useState({stakingAmount: "", earned: ""})
  const [stakeValue, handleStakeInput] = useState("")
  const [getAccountToken, {loading, error, data}] = useLazyQuery(GET_ACCOUNT_TOKEN)

  const params = useParams()
  const tokenAddress = params.address

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
    if (!walletAddress || !tokenAddress) {
      return
    }
    getAccountToken({
      variables: {id: walletAddress.toLowerCase().concat("-").concat(tokenAddress)}
    })
  }, [walletAddress, tokenAddress, getAccountToken])

  useEffect(() => {
    if (loading || error || !data) {
      return
    }

    const decimals = data.accountToken.token.decimals
    setToken({
        address: data.accountToken.token.id,
        name: data.accountToken.token.name,
        symbol: data.accountToken.token.symbol,
        totalSupply: ethers.utils.formatUnits(data.accountToken.token.totalSupply, decimals),
        decimals: decimals,
        balance: ethers.utils.formatUnits(data.accountToken.balance, decimals),
        creatorTokenRatio: data.accountToken.token.creatorTokenRatio,
        lockupPeriod: data.accountToken.token.lockupPeriod,
      }
    )
  }, [loading, error, data, setToken]);

  useEffect(() => {
    if (!tokenAddress || !provider) {
      return
    }
    const f = async () => {
      const signer = await provider.getSigner()
      const walletAddress = await signer.getAddress()
      setWalletAddress(walletAddress)

      const fanToken = new Contract(tokenAddress, abis.fanToken, provider)
      const totalSupply = await fanToken.totalSupply()
      const decimals = await fanToken.decimals()

      const staking = new Contract(addresses.Staking, abis.staking, provider)
      const isStakingPaused = await staking.tokensStakingPaused(tokenAddress)
      const stakingAmount = await staking.balanceOf(walletAddress, tokenAddress)

      let earned = ethers.BigNumber.from(0)
      if (!isStakingPaused || stakingAmount > 0) {
        earned = await staking.earned(walletAddress, tokenAddress, totalSupply, decimals)
      }

      const allowanceAmount = await fanToken.allowance(walletAddress, addresses.Staking)
      const stakingInfo = {
        isStakingPaused: isStakingPaused,
        stakingAmount: ethers.utils.formatUnits(stakingAmount),
        earned: ethers.utils.formatUnits(earned),
        allowance: allowanceAmount.toNumber()
      }
      setStakingInfo(stakingInfo)
    }
    f()
  }, [provider, tokenAddress])

  const withdrawStakingToken = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    const bgStakingAmount = await ethers.BigNumber.from(ethers.utils.parseUnits(stakingInfo.stakingAmount), token.decimals)
    staking.withdraw(bgStakingAmount, address)
  }

  const claimEarnedToken = async (address) => {
    const signer = await provider.getSigner()
    const staking = new Contract(addresses.Staking, abis.staking, signer)
    staking.claim(address)
  }

  const approve = async (address) => {
    if (stakeValue === "" || stakeValue == 0) {
      return
    }
    const signer = await provider.getSigner()
    const fanToken = new Contract(tokenAddress, abis.fanToken, signer)
    if (stakingInfo.allowance > 0) {
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
      provider={provider} 
      loadWeb3Modal={loadWeb3Modal}
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
