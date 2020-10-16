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
  handleAudiusCheckbox,
  audiusCheckboxValue,
  audius,
  libs,
  isAudiusSigningIn,
  emailRef,
  passwordRef,
  audiusFollowers,
  audiusSignIn,
  audiusSignOut,
  openModal,
  closeModal,
  isOpen,
  audiusPercentageInput,
  audiusPercentageValue,
  handleAudiusDistribution
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
          lockupInput={lockupInput}
          lockupValue={lockupValue}
          handleStakingCheckbox={handleStakingCheckbox}
          stakingCheckboxValue={stakingCheckboxValue}
          handleAudiusCheckbox={handleAudiusCheckbox}
          audiusCheckboxValu={audiusCheckboxValue}
          audius={audius}
          libs={libs}
          isAudiusSigningIn={isAudiusSigningIn}
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
      }
    />
  </div>
)

export default CreateTokenPageTemplate
