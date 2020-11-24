import React from "react";
import { Box } from "rimble-ui";
import Index from "../molecules/AppHeader";
import TokenAudius from "../organisms/TokenAudius";

const WithdrawAudiusPageTemplate = ({
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
  isRequestAddress,
  checkAudiusStatus,
  isWithdrawLoading,
  tokenInfo,
}) => (
  <div>
    <Index />
    <Box m={"auto"} my={5} width={[4 / 5, 3 / 4]}>
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
        isRequestAddress={isRequestAddress}
        checkAudiusStatus={checkAudiusStatus}
        isWithdrawLoading={isWithdrawLoading}
        tokenInfo={tokenInfo}
      />
    </Box>
  </div>
);

export default WithdrawAudiusPageTemplate;
