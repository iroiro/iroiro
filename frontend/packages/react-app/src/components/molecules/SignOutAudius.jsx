import React from "react";
import {
  Box,
  Button,
  Field,
} from "rimble-ui";

const SignInAudius = ({
  audiusSignOut
}) => (
  <Box mt={2}>
    <Button.Outline size="small" mainColor="#333" onClick={audiusSignOut}>Signout from Audius</Button.Outline>
  </Box>
)

export default SignInAudius