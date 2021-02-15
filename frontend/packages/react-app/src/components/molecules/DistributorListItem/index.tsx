/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
              to={`/dashboard/${tokenAddress}/distributors/${distributor.id}/${distributor.type}`}
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
