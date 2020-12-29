import React from "react";
import { Card, Heading, Text, Flex, Button } from "rimble-ui";
import DistributionTargetList from "../../molecules/DistributionTargetList";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import { Box } from "@material-ui/core";
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
      <Heading>1. Check your followers list</Heading>
      <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Heading as={"h3"}>Audius Followers list</Heading>
        <Text>Total users: {audiusState.followersCount}</Text>
      </Flex>

      <DistributionTargetList
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
      />
      {audiusState.followers.length > 0 && (
        <Box my={4} style={{ textAlign: "center" }}>
          <Button
            mainColor="itblue"
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
