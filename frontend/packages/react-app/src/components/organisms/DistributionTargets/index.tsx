import React from "react";
import { Box, Typography, Card, Button } from "@material-ui/core";
import DistributionTargetList from "../../molecules/DistributionTargetList";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import SignOutAudius from "../../molecules/SignOutAudius";

export interface TargetsProps {
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const DistributionTargets: React.FC<TargetsProps> = ({
  audiusState,
  audiusDispatch,
  distributorFormDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>1. Check your followers list</Typography>
        </Box>
        <Box
          mt={4}
          my={2}
          display="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant={"h4"}>Audius Followers list</Typography>
          <Typography>Total users: {audiusState.followersCount}</Typography>
        </Box>
        <DistributionTargetList
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
        {audiusState.followers.length > 0 && (
          <Box my={5} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Card>
    {audiusState.followers.length > 0 && (
      <SignOutAudius
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
      />
    )}
  </>
);

export default DistributionTargets;
