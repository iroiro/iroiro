import React, {useCallback, useEffect, useState, useRef} from "react";
import { useHistory } from 'react-router-dom';
import {ethers} from "ethers"
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import {Web3Provider} from "@ethersproject/providers";
import CreateTokenPageTemplate from "../templates/CreateTokenPageTemplate";
import Audius from '@audius/libs'

const init = async () => {
  const dataRegistryAddress = '0xC611C82150b56E6e4Ec5973AcAbA8835Dd0d75A2'

  // For Mainnet
  // const ethTokenAddress = '0xADEf65C0f6a30Dcb5f88Eb8653BBFe09Bf99864f'
  // const ethRegistryAddress = '0xb2be26Ca062c5D74964921B80DE6cfa28D9A36c0'
  // const ethProviderUrl = 'https://mainnet.infura.io/v3/d6b566d7eea1408988388c311d5a273a'
  // const ethProviderOwnerWallet = '0xe886a1858d2d368ef8f02c65bdd470396a1ab188'

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

const CreateTokenPage = () => {
  const [provider, setProvider] = useState();
  const [nameValue , nameInput] = useState("Sample Token");
  const [symbolValue , symbolInput] = useState("SMT");
  const [numberValue , numberInput] = useState(10000000000);
  const [decimalsValue , decimalsInput] = useState(18);
  const [limitCheckboxValue, handleLimitCheckbox] = useState(false);
  const [teamValue, teamInput] = useState(30);

  const [audiusPercentageValue, audiusPercentageInput] = useState("")
  const [audiusValue, setAudiusValue] = useState(0)
  
  const [lockupValue, lockupInput] = useState(2);
  const [stakingCheckboxValue, handleStakingCheckbox] = useState(true);
  const [audiusCheckboxValue, handleAudiusCheckbox] = useState(false);

  const history = useHistory();

  const [libs, setLibs] = useState(null)
  const [audiusAccount, setAudiusAccount] = useState(null)
  const [audiusFollowers, setAudiusFollowers] = useState([])
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const emailRef = useRef()
  const passwordRef = useRef()

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
    closeModal()
  }, [libs])

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

  const handleSubmit = async e => {
    e.preventDefault();
    alert("TODO!")
    // const signer = await provider.getSigner();
    // const walletAddress = await signer.getAddress()
    // const tokenFactory = new Contract(addresses.TokenFactory, abis.tokenFactory, signer);
    // const tx = await tokenFactory.createToken(
    //   walletAddress,
    //   nameValue,
    //   symbolValue,
    //   numberValue,
    //   decimalsValue,
    //   teamValue,
    //   audiusValue,
    //   limitCheckboxValue,
    //   lockupValue,
    //   stakingCheckboxValue
    // )
    // history.push("/dashboard")
  }

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  }

  const closeModal = e => {
    e.preventDefault();
    setIsOpen(false);
  }
  const handleAudiusDistribution = e => {
    e.preventDefault();
    const communityValue = 100 - teamValue
    const audiusValue = communityValue * audiusPercentageValue / 100
    setAudiusValue(audiusValue)
    setIsOpen(false);
  }

  return (
      <CreateTokenPageTemplate
        provider={provider} 
        loadWeb3Modal={loadWeb3Modal}
        handleSubmit={handleSubmit}
        nameInput={nameInput}
        nameValue={nameValue}
        symbolInput={symbolInput}
        symbolValue={symbolValue}
        numberInput={numberInput}
        numberValue={numberValue}
        decimalsInput={decimalsInput}
        decimalsValue={decimalsValue}
        handleLimitCheckbox={handleLimitCheckbox}
        limitCheckboxValue={limitCheckboxValue}
        teamInput={teamInput}
        teamValue={teamValue}
        lockupInput={lockupInput}
        lockupValue={lockupValue}
        handleStakingCheckbox={handleStakingCheckbox}
        stakingCheckboxValue={stakingCheckboxValue}
        handleAudiusCheckbox={handleAudiusCheckbox}
        audiusCheckboxValue={audiusCheckboxValue}
        audius={audiusAccount}
        libs={libs}
        isAudiusSigningIn={isSigningIn}
        emailRef={emailRef}
        passwordRef={passwordRef}
        audiusFollowers={audiusFollowers}
        audiusSignIn={audiusSignIn}
        audiusSignOut={audiusSignOut}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
        handleAudiusDistribution={handleAudiusDistribution}
        audiusPercentageInput={audiusPercentageInput}
        audiusPercentageValue={audiusPercentageValue}
      />
  );
}

export default CreateTokenPage