import React from "react";
import {
  Box,
  Button,
  Field,
} from "rimble-ui";

const SignInAudius = ({
  emailRef,
  passwordRef,
  audiusSignIn,
}) => (
  <Box> 
    <Field label="Email" mr="2">
      <input ref={emailRef} required/>
      </Field>
    <Field label="Password">
      <input ref={passwordRef} type="password" required/>
    </Field>
    <Box>
      <Button onClick={audiusSignIn}>Sign In</Button>
    </Box>
  </Box>
)

export default SignInAudius