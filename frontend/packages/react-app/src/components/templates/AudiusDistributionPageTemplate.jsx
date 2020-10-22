import React from "react";
import { Box } from "rimble-ui"
import AppHeader from "../molecules/AppHeader";
import AudiusDistribution from "../organisms/AudiusDistribution";

const TopPageTemplate = ({
  provider,
  loadWeb3Modal,
  libs,
  audius,
  audiusFollowers, 
  isAudiusSigningIn,
  emailRef,
  passwordRef,
  audiusSignIn,
  audiusSignOut,
  handleSubmit,
  amountInput,
  amountValue,
  tokenInfo,
  addAudiusList,
}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box m={"auto"} my={5} width={[4/5, 3/4]} >
      <AudiusDistribution
        libs={libs}
        audius={audius}
        audiusFollowers={audiusFollowers}
        isAudiusSigningIn={isAudiusSigningIn}
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
    </Box>
  </div>
)

export default TopPageTemplate
