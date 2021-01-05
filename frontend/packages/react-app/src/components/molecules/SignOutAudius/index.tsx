import React from "react";
import { Box, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

const ColorButton = withStyles(() => ({
  root: {
    color: red[500],
  },
}))(Button);

export interface SignOutAudiusProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const SignOutAudius: React.FC<SignOutAudiusProps> = ({ audiusDispatch }) => (
  <Box mt={4} style={{ textAlign: "center" }}>
    <ColorButton
      size="small"
      variant="outlined"
      onClick={() =>
        audiusDispatch({
          type: "isRequestSignout:set",
          payload: { isRequestSignout: true },
        })
      }
    >
      Signout from Audius
    </ColorButton>
  </Box>
);

export default SignOutAudius;
