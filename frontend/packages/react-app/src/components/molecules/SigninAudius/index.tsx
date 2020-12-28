import React from "react";
import { Box, Button, Card, Text, Heading, Input } from "rimble-ui";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface SigninAudiusProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const SigninAudius: React.FC<SigninAudiusProps> = ({
  audiusState,
  audiusDispatch,
}) => (
  <Card>
    <Box width={[1 / 2]} m={"auto"}>
      <Box mb={4} style={{ textAlign: "center" }}>
        <Heading as={"h1"}>Audius Signin</Heading>
        <Text mt={2}>Get your followers with signin Audius</Text>
      </Box>
      <Box>
        <Input
          mb={2}
          type="email"
          required
          width={1}
          placeholder="Email"
          onChange={(event: any) =>
            audiusDispatch({
              type: "email:set",
              payload: { email: event.target.value },
            })
          }
          value={audiusState.email}
        />
      </Box>
      <Box mt={2}>
        <Input
          mb={2}
          type="password"
          required
          width={1}
          placeholder="Password"
          onChange={(event: any) =>
            audiusDispatch({
              type: "password:set",
              payload: { password: event.target.value },
            })
          }
          value={audiusState.password}
        />
      </Box>
      <Box m={"auto"} my={4} style={{ textAlign: "center" }}>
        {audiusState.isLibsActive ? (
          <Button
            onClick={() => audiusDispatch({ type: "audius:login" })}
            mainColor={"#7e1bcc"}
          >
            Sign In
          </Button>
        ) : (
          <Button mainColor={"#7e1bcc"} disabled>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  </Card>
);

export default SigninAudius;
