import React from "react";
import { Box, Text, Table } from "rimble-ui";
import { Target } from "../../../interfaces";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import SigninAudius from "../SigninAudius";

export interface TargetsProps {
  readonly distributionTargets: Target[];
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const DistributionTargetList: React.FC<TargetsProps> = ({
  distributionTargets,
  audiusState,
  audiusDispatch,
}) => (
  <>
    {distributionTargets.length > 0 ? (
      <Table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {distributionTargets.map((target) => (
            <tr key={target.wallet}>
              <td>{target.handle}</td>
              <td>{target.wallet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <Box style={{ textAlign: "center" }}>
        <Text my={4}>No Users</Text>
        <SigninAudius
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
      </Box>
    )}
  </>
);

export default DistributionTargetList;
