import React from "react";
import { Box, Text, Table } from "rimble-ui";
import { Target } from "../../../interfaces";

export interface TargetsProps {
  readonly distributionTargets: Target[];
}

const DistributionTargetList = ({ distributionTargets }: TargetsProps) => (
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
        <Text>No Users</Text>
      </Box>
    )}
  </>
);

export default DistributionTargetList;
