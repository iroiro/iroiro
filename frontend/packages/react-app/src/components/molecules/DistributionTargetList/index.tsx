import React from "react";
import { Box, Text, Table, Button, Progress } from "rimble-ui";
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
      <Box style={{ textAlign: "center" }}>
        <Text my={4}>No Users</Text>
      </Box>
    );
  }
  if (audiusState.followers.length > 0) {
    return (
      <div style={{ overflowY: "scroll", height: "400px" }}>
        <Table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Wallet</th>
            </tr>
          </thead>
          <tbody>
            {audiusState.followers.map((target) => (
              <tr key={target.wallet}>
                <td>{target.handle}</td>
                <td>{target.wallet}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  return <Progress value={audiusState.progress} style={{ width: "100%" }} />;
};

export default DistributionTargetList;
