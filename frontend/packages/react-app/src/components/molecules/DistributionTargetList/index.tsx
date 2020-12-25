import React from "react";
import { Box, Text, Table, Button } from "rimble-ui";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import SigninAudius from "../SigninAudius";

export interface TargetsProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const DistributionTargetList: React.FC<TargetsProps> = ({
  audiusState,
  audiusDispatch,
}) => (
  <>
    {audiusState.followers.length > 0 ? (
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
        {audiusState.followersCount !== audiusState.followers.length && (
          <Box my={2} style={{ textAlign: "center" }}>
            <Button.Text
              mainColor="itblue"
              onClick={() =>
                audiusDispatch({
                  type: "isRequestFollowers:set",
                  payload: { isRequestFollowers: true },
                })
              }
            >
              load more...
            </Button.Text>
          </Box>
        )}
      </div>
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
