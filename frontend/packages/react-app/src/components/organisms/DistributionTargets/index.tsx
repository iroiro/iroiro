import React from "react";
import { Card, Heading, Text, Flex } from "rimble-ui";
import { Target } from "../../../interfaces";
import DistributionTargetList from "../../molecules/DistributionTargetList";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface TargetsProps {
  readonly distributionTargets: Target[];
  readonly targetNumber: number;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const DistributionTargets: React.FC<TargetsProps> = ({
  distributionTargets,
  targetNumber,
  audiusState,
  audiusDispatch,
}) => (
  <Card>
    <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
      <Heading as={"h3"}>Audius Followers list</Heading>
      <Text>Total users: {targetNumber}</Text>
    </Flex>

    <DistributionTargetList
      distributionTargets={distributionTargets}
      audiusState={audiusState}
      audiusDispatch={audiusDispatch}
    />
  </Card>
);

export default DistributionTargets;
