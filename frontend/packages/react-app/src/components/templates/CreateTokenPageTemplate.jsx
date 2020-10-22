import React from "react";
import AppHeader from "../molecules/AppHeader"
import CreatTokenForm from "../organisms/CreateTokenForm"
import { Box } from "rimble-ui"

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
    <Box m={"auto"} my={5} width={[3/4, 1/2, 1/3]} >
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
    </Box>
  </div>
)

export default CreateTokenPageTemplate
