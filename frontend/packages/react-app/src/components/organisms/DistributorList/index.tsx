import React from "react";
import { Box } from "rimble-ui";
import { Distributor } from "../../../interfaces";
import DistributorListItem from "../../molecules/DistributorListItem";

export interface DistributorsProps {
  readonly distributors: Distributor[];
  readonly tokenAddress: string;
}

const DistributorList: React.FC<DistributorsProps> = ({
  distributors,
  tokenAddress,
}) => {
  return (
    <Box>
      {distributors.length > 0 ? (
        distributors.map((distributor) => (
          <DistributorListItem
            key={distributor.id}
            distributor={distributor}
            tokenAddress={tokenAddress}
          />
        ))
      ) : (
        <div>No Disributor</div>
      )}
    </Box>
  );
};

export default DistributorList;
