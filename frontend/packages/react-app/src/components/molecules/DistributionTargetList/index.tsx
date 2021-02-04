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
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import SigninAudius from "../SigninAudius";

export interface TargetsProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const DistributionTargetList: React.FC<TargetsProps> = ({
  audiusState,
  audiusDispatch,
}) => {
  if (!audiusState.user) {
    return (
      <Box style={{ textAlign: "center" }}>
        <SigninAudius
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
      </Box>
    );
  }
  if (audiusState.followersCount <= 0) {
    return (
      <Box my={4} style={{ textAlign: "center" }}>
        <Typography>No Users</Typography>
      </Box>
    );
  }
  if (audiusState.followers.length > 0) {
    return (
      <Box my={4} style={{ textAlign: "center" }}>
        <Typography>Total Followers</Typography>
        <Typography variant="h2">{audiusState.followers.length}</Typography>
      </Box>
    );
  }

  return (
    <Box py={5}>
      <LinearProgress
        variant="determinate"
        value={audiusState.progress}
        style={{ width: "100%" }}
      />
    </Box>
  );
};

export default DistributionTargetList;
