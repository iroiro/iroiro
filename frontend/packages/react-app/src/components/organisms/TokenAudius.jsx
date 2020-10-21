import React from "react"
import {
  Loader,
  Box,
  Flex,
} from "rimble-ui"

import SignInAudius from "../molecules/SignInAudius"
import SignOutAudius from "../molecules/SignOutAudius"
import AudiusAccount from "../molecules/AudiusAccount"
import AudiusAddressInput from "../molecules/AudiusAddressInput"
import AudiusWithdrawToken from "../molecules/AudiusWithdrawToken"

const TokenAudius = ({
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
  <Box>
    {libs && !myAccount && !isSigningIn && (
      <SignInAudius
        emailRef={emailRef}
        passwordRef={passwordRef}
        audiusSignIn={signIn}
      />
    )}
    {isSigningIn && (
      <Loader size="80px" m="auto" />
    )}
    {myAccount && (
      <Box>
        <AudiusAccount
          myAccount={myAccount}
        />
        <Flex style={{ justifyContent: "flex-end" }}>
          <SignOutAudius
            audiusSignOut={signOut}
          />
        </Flex>
        <AudiusAddressInput
          addressSubmit={addressSubmit}
          addressInput={addressInput}
          addressValue={addressValue}
        />
        {distributedAmount > 0 &&
          <AudiusWithdrawToken
            distributedAmount={distributedAmount}
            withdrawToken={withdrawToken}
          />
        }
      </Box>
    )}
  </Box>
)

export default TokenAudius
