import React, {useCallback, useEffect, useState, useRef} from "react";
// import { useHistory } from 'react-router-dom';
import { ethers } from "ethers"
import { web3Modal } from "../../utils/web3Modal";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses, oracleJobs } from "@project/contracts";
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
  const [isClaimable, setIsClaimable] = useState(true)
  const [isRequestAddress, setIsRequestAddress] = useState(false)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)
  const [tokenInfo, setTokenInfo] = useState({name: "-", symbol: "-", balance: "-", address: "-", decimals: ""})

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
      setIsSigningIn(true)
      const libs = await init()
      setIsSigningIn(false)
      setLibs(libs)

      const user = libs.Account.getCurrentUser()
      const wallet = libs.hedgehog.getWallet()
      const provider = new ethers.providers.InfuraProvider("ropsten");
      const balance = await provider.getBalance(wallet.getAddressString())

      if (user) {
        user.balance = ethers.utils.formatUnits(balance, 18)
        setMyAccount(user)
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

    const wallet = libs.hedgehog.getWallet()
    const provider = new ethers.providers.InfuraProvider("ropsten");
    const balance = await provider.getBalance(wallet.getAddressString())
    
    if (user) {
      user.balance = balance.toString()
      setMyAccount(user)
    }
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
      const provider = new ethers.providers.InfuraProvider("ropsten");
      const ethersWallet = new ethers.Wallet(wallet.getPrivateKey(), provider)
      const walletAddress = await wallet.getAddressString()
      const audius = new Contract(addresses.Audius, abis.audius, ethersWallet)
      const followersHash = await audius.followersHash(addressValue)
      const fee = ethers.BigNumber.from('2000000000000000000')

      const tx = await audius.requestCheckingAddress(
        addresses.Oracle,
        oracleJobs.jobIdBytes,
        walletAddress,
        addressValue,
        addressValue,
        fee,
      )
      
      tx.wait().then(async (receipt) => {
        const fanToken = new Contract(addressValue, abis.fanToken, ethersWallet)
        const name = await fanToken.name()
        const symbol = await fanToken.symbol()
        const balance = await fanToken.balanceOf(walletAddress)
        const decimals = await fanToken.decimals()

        const token = {
          name: name,
          symbol: symbol,
          balance: balance.toString(),
          address: addressValue,
          decimals: decimals,
        }
        setTokenInfo(token)
        setIsRequestAddress(true)
      })
    }
  }

  const checkAudiusStatus = async () => {
    const provider = new ethers.providers.InfuraProvider("ropsten");
    const ethersWallet = new ethers.Wallet(wallet.getPrivateKey(), provider)
    const audius = new Contract(addresses.Audius, abis.audius, ethersWallet)
    const claimable = await audius.isClaimable(addressValue)

    if(!claimable) {
      setIsClaimable(false)
      return
    }
    
    const fanToken = new Contract(addressValue, abis.fanToken, ethersWallet)
    const decimals = await fanToken.decimals()

    const distributedAmount = await audius.distributedAmount(addressValue)
    const distributedAmountString = ethers.utils.formatUnits(distributedAmount, decimals)

    setIsClaimable(true)
    setDistributedAmount(distributedAmountString)
  }

  const withdrawToken = async () => {
    if(wallet) {
      const provider = new ethers.providers.InfuraProvider("ropsten");
      const ethersWallet = new ethers.Wallet(wallet.getPrivateKey(), provider)
      const audius = new Contract(addresses.Audius, abis.audius, ethersWallet)

      const tx = await audius.claim(addressValue)
      
      tx.wait().then(async (receipt) => {
        const walletAddress = await wallet.getAddressString()
        const fanToken = new Contract(addressValue, abis.fanToken, ethersWallet)
        const name = await fanToken.name()
        const symbol = await fanToken.symbol()
        const balance = await fanToken.balanceOf(walletAddress)
  
        const token = {
          name: name,
          symbol: symbol,
          balance: balance.toString(),
          address: addressValue,
        }
        setTokenInfo(token)
        setDistributedAmount(0)
      })
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
      isClaimable={isClaimable}
      isRequestAddress={isRequestAddress}
      checkAudiusStatus={checkAudiusStatus}
      isWithdrawLoading={isWithdrawLoading}
      tokenInfo={tokenInfo}
    />
  );
}

export default WithdrawAudiusPage