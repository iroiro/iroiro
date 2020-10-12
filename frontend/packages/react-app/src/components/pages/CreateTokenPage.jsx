import React, {useCallback, useEffect, useState} from "react";
import {web3Modal} from "../../utils/web3Modal";
import {Web3Provider} from "@ethersproject/providers";
import CreateTokenPageTemplate from "../templates/CreateTokenPageTemplate";

const CreateTokenPage = () => {
  const [provider, setProvider] = useState();
  const [nameValue , nameInput] = useState("");
  const [symbolValue , symbolInput] = useState("");
  const [numberValue , numberInput] = useState("");
  const [decimalsValue , decimalsInput] = useState("");
  const [limitCheckboxValue, handleLimitCheckbox] = useState(false);
  const [teamValue, teamInput] = useState("");
  const [communityValue, communityInput] = useState("");
  const [lockupValue, lockupInput] = useState("");
  const [stakingCheckboxValue, handleStakingCheckbox] = useState("");

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

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submitted valid form");
    console.log({
      symbolValue,
      numberValue,
      decimalsValue,
      limitCheckboxValue,
      teamValue,
      communityValue,
      lockupValue,
      stakingCheckboxValue
    });
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