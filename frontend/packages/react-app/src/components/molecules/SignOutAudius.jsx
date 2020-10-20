import React from "react";
import {
  Box,
  Button,
  Field,
} from "rimble-ui";

const SignInAudius = ({
  audiusSignOut
}) => (
  <Box mt={4}>
    <Button size="small" variant="danger" onClick={audiusSignOut}>Signout from Audius</Button>
  </Box>
)

export default SignInAudius