import React, {useCallback, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {ethers} from "ethers"
import {web3Modal} from "../../utils/web3Modal";
import {Contract} from "@ethersproject/contracts";
import {abis, addresses} from "@project/contracts";
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import CreateTokenPageTemplate from "../templates/CreateTokenPageTemplate";

const CreateTokenPage = () => {
  const [provider, setProvider] = useState();
  const [nameValue , nameInput] = useState("Sample Token");
  const [symbolValue , symbolInput] = useState("SMT");
  const [numberValue , numberInput] = useState(10000000000);
  const [decimalsValue , decimalsInput] = useState(18);
  const [limitCheckboxValue, handleLimitCheckbox] = useState(false);
  const [teamValue, teamInput] = useState(30);
  const [communityValue, communityInput] = useState(70);
  const [lockupValue, lockupInput] = useState(2);
  const [stakingCheckboxValue, handleStakingCheckbox] = useState(true);
  const history = useHistory();

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

  const handleSubmit = async e => {
    e.preventDefault();
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress()
    const tokenFactory = new Contract(addresses.TokenFactory, abis.tokenFactory, signer);
    const tx = await tokenFactory.createToken(
      walletAddress,
      nameValue,
      symbolValue,
      numberValue,
      decimalsValue,
      teamValue,
      limitCheckboxValue,
      lockupValue,
      stakingCheckboxValue
    )
  
    history.push("/dashboard");
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
      communityInput={communityInput}
      communityValue={communityValue}
      lockupInput={lockupInput}
      lockupValue={lockupValue}
      handleStakingCheckbox={handleStakingCheckbox}
      stakingCheckboxValue={stakingCheckboxValue}
    />
  );
}

export default CreateTokenPage