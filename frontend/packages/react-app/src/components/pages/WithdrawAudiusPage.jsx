import React, {useCallback, useEffect, useState, useRef} from "react";
// import { useHistory } from 'react-router-dom';
import { ethers } from "ethers"
import { web3Modal } from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import { Web3Provider} from "@ethersproject/providers";
import WithdrawAudiusPageTemplate from "../templates/WithdrawAudiusPageTemplate";
import Audius from "@audius/libs"
// import Transaction from "@ethereumjs/tx"

const init = async () => {
  const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

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

const WithdrawAudiusPage = () => {
  const [provider, setProvider] = useState();
  const [libs, setLibs] = useState(null)
  const [myAccount, setMyAccount] = useState(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [addressValue, addressInput] = useState("")
  const [distributedAmount, setDistributedAmount] = useState(0)

  const emailRef = useRef()
  const passwordRef = useRef()

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

  // Initialize @audius/libs on mount
  useEffect(() => {
    const initLibs = async () => {
      const libs = await init()
      setLibs(libs)

      const user = libs.Account.getCurrentUser()
      if (user) {
        setMyAccount(user)
        const wallet = libs.hedgehog.getWallet()
        setWallet(wallet)
      }
    }
    initLibs()
  }, [])

  // Sign in handler
  const signIn = useCallback(async () => {
    setIsSigningIn(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const { user } = await libs.Account.login(email, password)
    setIsSigningIn(false)
    if (user) {
      setMyAccount(user)
    }
    const wallet = libs.hedgehog.getWallet()
    setWallet(wallet)
  }, [libs])

  // Sign out handler
  const signOut = useCallback(async () => {
    await libs.Account.logout()
    setMyAccount(null)
    setWallet(null)
  }, [libs])

  const addressSubmit = async (e) => {
    e.preventDefault()
    if(wallet) {
      // TODO: Add correct contract function
      // const provider = new ethers.providers.InfuraProvider("ropsten");
      // const ethersWallet = new ethers.Wallet(wallet.getPrivateKey(), provider)
      // const balance = await provider.getBalance(ethersWallet.address)
      // const audius = new Contract(addresses.Audius, abis.audius, ethersWallet)
      // const distributedAmount = await audius.distributedAmount(addressValue)
      // setDistributedAmount(distributedAmount.toNumber())
      setDistributedAmount(1000000)
    }
  }

  const withdrawToken = async () => {
    if(wallet) {
      // TODO: Add correct contract function
      // const provider = new ethers.providers.InfuraProvider("ropsten");
      // const ethersWallet = new ethers.Wallet(wallet.getPrivateKey(), provider)
      // const balance = await provider.getBalance(ethersWallet.address)
      // const audius = new Contract(addresses.Audius, abis.audius, ethersWallet)
      // await audius.claim(addressValue)
      setDistributedAmount(0)
      addressInput("")
    }
  }

  return (
    <WithdrawAudiusPageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      libs={libs}
      myAccount={myAccount}
      isSigningIn={isSigningIn}
      signIn={signIn}
      signOut={signOut}
      emailRef={emailRef}
      passwordRef={passwordRef}
      addressInput={addressInput}
      addressValue={addressValue}
      addressSubmit={addressSubmit}
      distributedAmount={distributedAmount}
      withdrawToken={withdrawToken}
    />
  );
}

export default WithdrawAudiusPage