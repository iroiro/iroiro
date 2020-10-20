import React, {useCallback, useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom"
import {web3Modal} from "../../utils/web3Modal";
import {Web3Provider} from "@ethersproject/providers";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import AudiusDistributionPageTemplate from "../templates/AudiusDistributionPageTemplate";
import Audius from '@audius/libs'

import IpfsHttpClient from "ipfs-http-client"
const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
const ipfs = IpfsHttpClient(infura)

const init = async () => {
  const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

  // For Ropsten
  const ethTokenAddress = '0xF0A4A438821d21e37150e9916569De7c156E898F'
  const ethRegistryAddress = '0x095284A8237b275aBB96E8587e60ed76983BE6A5'
  const ethProviderUrl = 'https://ropsten.infura.io/v3/b8d7e2bc1b8942a6859e2a840b82f09d'
  const ethProviderOwnerWallet = '0xC7310a03e930DD659E15305ed7e1F5Df0F0426C5'

  const libs = new Audius({
    web3Config: Audius.configInternalWeb3(
      dataRegistryAddress,
      ['https://core.poa.network']
    ),
    ethWeb3Config: Audius.configEthWeb3(
      ethTokenAddress,
      ethRegistryAddress,
      ethProviderUrl,
      ethProviderOwnerWallet
    ),
    discoveryProviderConfig: Audius.configDiscoveryProvider(),
    identityServiceConfig: Audius.configIdentityService(
      'https://identityservice.audius.co'
    ),
    creatorNodeConfig: Audius.configCreatorNode(
      'https://creatornode.audius.co'
    )
  })
  await libs.init()
  window.libs = libs
  return libs
}

const AudiusDisributionPage = () => {
  const [provider, setProvider] = useState();
  const [libs, setLibs] = useState(Object)
  const [audiusAccount, setAudiusAccount] = useState(null)
  const [audiusFollowers, setAudiusFollowers] = useState([])
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [amountValue, amountInput] = useState("")
  const [tokenAddress, setTokenAddress] = useState(0)
  const [tokenInfo, setTokenInfo] = useState({name: "", balance: 0, address: ""})

  const emailRef = useRef()
  const passwordRef = useRef()
  const params = useParams()

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  // Sign in handler
  const audiusSignIn = useCallback(async () => {
    setIsSigningIn(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const { user } = await libs.Account.login(email, password)
    const followers = await libs.User.getFollowersForUser(100, 0, user.user_id)

    setIsSigningIn(false)
    setAudiusAccount(user)
    setAudiusFollowers(followers)
  }, [libs])

  // Sign out handler
  const audiusSignOut = useCallback(async () => {
    await libs.Account.logout()
    setAudiusAccount(null)
  }, [libs])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const fanToken = new Contract(tokenAddress, abis.fanToken, signer)
    fanToken.transfer(tokenAddress, amountValue) // TODO: change contract address
  }

  const getTokenBalance = async () => {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const fanToken = new Contract(tokenAddress, abis.fanToken, provider)
    const name = await fanToken.name()
    const balance = await fanToken.balanceOf(walletAddress)

    const token = {
      name: name,
      balance: balance.toNumber(),
      address: tokenAddress
    }

    setTokenInfo(token)
  }

  const addAudiusList = async () => {
    const signer = await provider.getSigner()
    const walletAddress = await signer.getAddress()
    const factory = new Contract(addresses.TokenFactory, abis.tokenFactory, provider)
    const tokenAmount = await factory.tokenAmountOf(walletAddress)
    
    console.log(tokenAmount)
    let tokenId

    for(let i = 0; i < tokenAmount.toNumber(); i++) {
      const dddress = await factory.creatorTokenOf(walletAddress, i+1)
      if(tokenAddress == dddress) {
        tokenId = i+1
      }
    }
    
    let waelletAddresses = []
    for(let i = 0; i < audiusFollowers.length; i++) {
      waelletAddresses.push(audiusFollowers[i].wallet)
    }
    const json = {addresses: waelletAddresses}
    const { path } = await ipfs.add(JSON.stringify(json))

    const audius = new Contract(addresses.Audius, abis.audius, signer)
    const _followersNum = audiusFollowers.length

    // TODO: add collect contract when it is ready
    // await audius.addAudiusList(tokenId, path, _followersNum)
    alert(`Success! ${_followersNum}, ${path}`)
  }

  useEffect(() => {
    setTokenAddress(params.address)
    if(provider && tokenAddress) {
      getTokenBalance()
    }
  },[provider, tokenAddress])

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  // Initialize @audius/libs on mount
  useEffect(() => {
    const initLibs = async () => {
      const libs = await init()
      setLibs(libs)
      const user = libs.Account.getCurrentUser()

      if (user) {
        const followers = await libs.User.getFollowersForUser(100, 0, user.user_id)
        setAudiusAccount(user)
        setAudiusFollowers(followers)
      }

    }
    initLibs()
  }, [])

  return (
    <AudiusDistributionPageTemplate
      libs={libs}
      audius={audiusAccount}
      audiusFollowers={audiusFollowers}
      isAudiusSigningIn={isSigningIn}
      emailRef={emailRef}
      passwordRef={passwordRef}
      audiusSignIn={audiusSignIn}
      audiusSignOut={audiusSignOut}
      handleSubmit={handleSubmit}
      amountInput={amountInput}
      amountValue={amountValue}
      tokenInfo={tokenInfo}
      addAudiusList={addAudiusList}
    />
  );
}

export default AudiusDisributionPage
