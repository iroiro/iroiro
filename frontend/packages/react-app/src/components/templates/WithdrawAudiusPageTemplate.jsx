import React from "react";
import AppHeader from "../molecules/AppHeader";
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
  passwordRef
}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <TokenAudius
      libs={libs}
      myAccount={myAccount}
      isSigningIn={isSigningIn}
      signIn={signIn}
      signOut={signOut}
      emailRef={emailRef}
      passwordRef={passwordRef}
    />
  </div>
)

export default WithdrawAudiusPageTemplate