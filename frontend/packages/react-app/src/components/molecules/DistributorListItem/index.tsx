import React from "react";
import { Card, Text } from "rimble-ui";
import { Link } from "react-router-dom";
import { Distributor } from "../../../interfaces";

export interface DistributorProps {
  readonly distributor: Distributor;
  readonly tokenAddress: string;
}

const DistributorListItem: React.FC<DistributorProps> = ({
  distributor,
  tokenAddress,
}) => {
  return (
    <Card key={distributor.id}>
      {"distributorMetadata" in distributor && (
        <Link
          to={`/dashboard/${tokenAddress}/distributors/${distributor.id}`}
          style={{ textDecoration: "none" }}
        >
          <Text fontSize={2} fontWeight="bold" color="itblue">
            {distributor.distributorMetadata.name}
          </Text>
        </Link>
      )}
    </Card>
  );
};

export default DistributorListItem;
