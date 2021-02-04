/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
