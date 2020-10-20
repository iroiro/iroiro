import React from "react";
import { Button, Heading, Loader, Text, Box } from "rimble-ui";

const TokenAudius = ({
  libs,
  myAccount,
  isSigningIn,
  signIn,
  signOut,
  emailRef,
  passwordRef,
}) => (
  <Box>
    {libs && !myAccount && !isSigningIn && (
      <Box>
        <div className="label">Email</div>
        <input ref={emailRef} className="email" />
        <div className="label">Password</div>
        <input ref={passwordRef} type="password" className="password" />

        <Button onClick={signIn}>Sign in</Button>
      </Box>
    )}
    {isSigningIn && (
      <div>Signing in...</div>
    )}
    {myAccount && (
      <Box>
        <Box>
          <Text>{myAccount.name}</Text>
          <Text>{`@${myAccount.handle}`}</Text>
          <Text>{myAccount.wallet}</Text>
        </Box>
        <Box>
          aaaa
        </Box>
        <Button mt={4} size="small" variant="danger" onClick={signOut}>Sign out</Button>
      </Box>
    )}
  </Box>
)

export default TokenAudius
