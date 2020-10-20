import React from "react";
import AppHeader from "../molecules/AppHeader";
import Container from "../atoms/Container"
import CreatTokenForm from "../organisms/CreateTokenForm";

const CreateTokenPageTemplate = ({
  provider,
  loadWeb3Modal,
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
  lockupInput,
  lockupValue,
  handleStakingCheckbox,
  stakingCheckboxValue,
}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Container>
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
        lockupInput={lockupInput}
        lockupValue={lockupValue}
        handleStakingCheckbox={handleStakingCheckbox}
        stakingCheckboxValue={stakingCheckboxValue}
      />
    </Container>
  </div>
)

export default CreateTokenPageTemplate
