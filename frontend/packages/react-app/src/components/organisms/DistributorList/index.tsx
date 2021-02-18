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
import { Box } from "@material-ui/core";
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
            key={distributor.id + distributor.type}
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
