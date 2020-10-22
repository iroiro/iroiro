import React from "react"
import {
  Loader,
  Box,
  Flex,
  Flash,
} from "rimble-ui";

import SignInAudius from "../molecules/SignInAudius"
import SignOutAudius from "../molecules/SignOutAudius"
import AudiusAccount from "../molecules/AudiusAccount"
import AudiusAddressInput from "../molecules/AudiusAddressInput"
import AudiusWithdrawToken from "../molecules/AudiusWithdrawToken"
import CheckClaimable from "../molecules/CheckClaimable"
import UserTokenInfo from "../molecules/UserTokenInfo"

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
  isClaimable,
  isRequestAddress,
  checkAudiusStatus,
  isWithdrawLoading,
  tokenInfo,
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
        {/* { isRequestAddress && */}
          <UserTokenInfo
            tokenInfo={tokenInfo}
          />
        {/* } */}
        {/* { isRequestAddress && */}
          <CheckClaimable
            checkAudiusStatus={checkAudiusStatus}
          />
        {/* } */}
        { !isClaimable && (
          <Flash my={3} variant="danger">
            You can't withdraw tokens from this contract.
          </Flash>
        )}
        {distributedAmount > 0 &&
          <AudiusWithdrawToken
            distributedAmount={distributedAmount}
            withdrawToken={withdrawToken}
            isWithdrawLoading={isWithdrawLoading}
            tokenInfo={tokenInfo}
          />
        }
      </Box>
    )}
  </Box>
)

export default TokenAudius
