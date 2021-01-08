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
