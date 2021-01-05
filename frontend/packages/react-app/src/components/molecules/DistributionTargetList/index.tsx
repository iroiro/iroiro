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
      <div style={{ overflowY: "scroll", height: "400px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User name</TableCell>
                <TableCell>Wallet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audiusState.followers.map((target) => (
                <TableRow key={target.wallet}>
                  <TableCell>{target.handle}</TableCell>
                  <TableCell>{target.wallet}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
