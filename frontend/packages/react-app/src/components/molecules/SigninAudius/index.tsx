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
import { Paper, Box, Typography, Input, Button } from "@material-ui/core";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface SigninAudiusProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const SigninAudius: React.FC<SigninAudiusProps> = ({
  audiusState,
  audiusDispatch,
}) => (
  <Paper>
    <Box
      width={[1 / 2]}
      m={"auto"}
      pt={3}
      pb={1}
      style={{ textAlign: "center" }}
    >
      <Box mb={4} style={{ textAlign: "center" }}>
        <Typography variant={"h3"}>Audius Signin</Typography>
        <Box mt={2}>
          <Typography>Get your followers with signin Audius</Typography>
        </Box>
      </Box>
      <Box mb={2}>
        <Input
          type="email"
          required
          placeholder="Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            audiusDispatch({
              type: "email:set",
              payload: { email: event.target.value },
            })
          }
          value={audiusState.email}
        />
      </Box>
      <Box my={2}>
        <Input
          type="password"
          required
          placeholder="Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            audiusDispatch({
              type: "password:set",
              payload: { password: event.target.value },
            })
          }
          value={audiusState.password}
        />
      </Box>
      <Box m={"auto"} my={4} style={{ textAlign: "center" }}>
        {audiusState.libs !== undefined ? (
          <Button
            variant="contained"
            onClick={() => audiusDispatch({ type: "audius:login" })}
            color={"primary"}
          >
            Sign In
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  </Paper>
);

export default SigninAudius;
