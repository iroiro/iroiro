import React from "react"
import { Box } from "rimble-ui"
import AppHeader from "../molecules/AppHeader"
import TokenAudius from "../organisms/TokenAudius"

const WithdrawAudiusPageTemplate = ({ 
  provider,
  loadWeb3Modal,
  libs,
  myAccount,
  isSigningIn,
  signIn,
  signOut,
  emailRef,
  passwordRef,
  addressInput,
  addressValue,
  addressSubmit,
  distributedAmount,
  withdrawToken,
}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Box m={"auto"} my={5} width={[4/5, 3/4]} >
      <TokenAudius
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
    </Box>
  </div>
)

export default WithdrawAudiusPageTemplate