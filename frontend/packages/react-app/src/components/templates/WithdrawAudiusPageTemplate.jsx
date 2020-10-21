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
  passwordRef,
  addressInput,
  addressValue,
  addressSubmit,
  distributedAmount,
  withdrawToken,
  isClaimable,
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
      addressInput={addressInput}
      addressValue={addressValue}
      addressSubmit={addressSubmit}
      distributedAmount={distributedAmount}
      withdrawToken={withdrawToken}
      isClaimable={isClaimable}
    />
  </div>
)

export default WithdrawAudiusPageTemplate