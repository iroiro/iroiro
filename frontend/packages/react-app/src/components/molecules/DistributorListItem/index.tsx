import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";
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
    <Box mb={1}>
      <Paper key={distributor.id}>
        {"distributorMetadata" in distributor && (
          <Box p={2}>
            <Link
              to={`/dashboard/${tokenAddress}/distributors/${distributor.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography color="secondary">
                {distributor.distributorMetadata.name}
              </Typography>
            </Link>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DistributorListItem;
