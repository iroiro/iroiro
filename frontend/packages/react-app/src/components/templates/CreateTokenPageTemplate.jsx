import React from "react";
import AppHeader from "../molecules/AppHeader";
import Container from "../atoms/Container"
import CreatTokenForm from "../organisms/CreateTokenForm";

const CreateTokenPageTemplate = ({
  provider,
  loadWeb3Modal,
  readOnChainData,
  handleSubmit,
  nameInput,
  nameValue,
  symbolInput,
  symbolValue,
  numberInput,
  numberValue,
  decimalsInput,
  decimalsValue,
  handleLimitCheckbox,
  limitCheckboxValue,
  teamInput,
  teamValue,
  communityInput,
  communityValue,
  lockupInput,
  lockupValue,
  handleStakingCheckbox,
  stakingCheckboxValue,
}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Container
      contents={
        <CreatTokenForm
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
      }
    />
  </div>
)

export default CreateTokenPageTemplate
