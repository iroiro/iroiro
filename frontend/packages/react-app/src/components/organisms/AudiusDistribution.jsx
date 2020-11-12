import React from "react";
import {
  Box,
} from "rimble-ui";
import SignInAudius from "../molecules/SignInAudius"
import SignOutAudius from "../molecules/SignOutAudius"
import DistributeAudiusToken from "../molecules/DistributeAudiusToken"

const AudiusDistribution = ({
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
    <Box>
      {libs && !audius && !isAudiusSigningIn
      ? 
        <SignInAudius
          emailRef={emailRef}
          passwordRef={passwordRef}
          audiusSignIn={audiusSignIn}
        />
      :
        <Box>
          <DistributeAudiusToken
            tokenInfo={tokenInfo}
            handleSubmit={handleSubmit}
            amountInput={amountInput}
            amountValue={amountValue}
            addAudiusList={addAudiusList}
            audiusFollowers={audiusFollowers}
          />
          <Box mt={4} style={{textAlign: "center"}}>
            <SignOutAudius
              audiusSignOut={audiusSignOut}
            />
          </Box>
        </Box>
      }
    </Box>
  </div>
)

export default AudiusDistribution
