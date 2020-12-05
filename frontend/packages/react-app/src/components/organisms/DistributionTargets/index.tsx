import React from "react";
import { Card, Heading, Text, Flex } from "rimble-ui";
import { Target } from "../../../interfaces";
import DistributionTargetList from "../../molecules/DistributionTargetList";

export interface TargetsProps {
  readonly targets: Target[];
  readonly targetNumber: number;
}

const DistributionTargets = ({ targets, targetNumber }: TargetsProps) => (
  <Card>
    <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
      <Heading as={"h3"}>Audius Followers list</Heading>
      <Text>Total users: {targetNumber}</Text>
    </Flex>

    <DistributionTargetList targets={targets} />
  </Card>
);

export default DistributionTargets;
