import React from "react";
import { Box } from "rimble-ui";
import { Distributor } from "../../../interfaces";
// import DistributorListItem from "../../molecules/DistributorListItem";

export interface Distributors {
  readonly distributors: Distributor[];
  readonly tokenAddress: string;
}

const DistributorList = ({ distributors, tokenAddress }: Distributors) => {
  return (
    <Box>
      {/* {distributors.length > 0 ? (
        distributors.map((distributor) => (
          <DistributorListItem
            key={distributor.id}
            distributor={distributor}
            tokenAddress={tokenAddress}
          />
        ))
      ) : (
        <div>No Disributor</div>
      )} */}
    </Box>
  );
};

export default DistributorList;
