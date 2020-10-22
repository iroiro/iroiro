import React from "react";
import {
  Box,
  Button,
  Card,
  Text,
  Heading,
} from "rimble-ui";

const SignInAudius = ({
  emailRef,
  passwordRef,
  audiusSignIn,
}) => (
  <Card>
    <Box width={[ 1/2 ]} m={"auto"}>
      <Box mb={4} style={{ textAlign: "center"}}>
        <Heading as={"h1"} >Audius Login</Heading>
      </Box>
      <Box>
        <Text fontSize={3} fontWeight="bold">Email</Text>
        <input style={{ fontSize: "24px", width: "100%", paddingTop: 11, paddingBottom: 11 }} ref={emailRef} required/>
      </Box>
      <Box mt={4}>
        <Text fontSize={3} fontWeight="bold">Password</Text>
        <input style={{ fontSize: "24px", width: "100%", paddingTop: 11, paddingBottom: 11 }} ref={passwordRef} type="password" required/>
      </Box>
      <Box m={"auto"} my={4} style={{ textAlign: "center"}}>
        <Button onClick={audiusSignIn} mainColor={"#7e1bcc"}>Sign In</Button>
      </Box>
    </Box>
  </Card>
)

export default SignInAudius