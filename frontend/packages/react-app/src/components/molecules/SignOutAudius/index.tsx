import React from "react";
import { Box, Button } from "rimble-ui";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface SignOutAudiusProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const SignOutAudius: React.FC<SignOutAudiusProps> = ({ audiusDispatch }) => (
  <Box mt={2}>
    <Button.Outline
      size="small"
      mainColor="#333"
      onClick={() =>
        audiusDispatch({
          type: "isRequestSignout:set",
          payload: { isRequestSignout: true },
        })
      }
    >
      Signout from Audius
    </Button.Outline>
  </Box>
);

export default SignOutAudius;
