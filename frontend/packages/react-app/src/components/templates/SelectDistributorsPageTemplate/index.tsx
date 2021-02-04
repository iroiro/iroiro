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
import { Typography, Box, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { Distributor } from "../../../interfaces";
import DistributorList from "../../organisms/DistributorList";
import { AppFooter } from "../../molecules/AppFooter";

export interface Distributors {
  readonly distributors: Distributor[];
  readonly tokenAddress: string;
}

const SelectDistributorsPageTemplate: React.FC<Distributors> = ({
  distributors,
  tokenAddress,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <AppHeader />
      <Box
        mt={5}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 266px)",
          minHeight: "300px",
        }}
      >
        <Container>
          <Box mb={1}>
            <Typography variant={"h3"}>Select distributor</Typography>
          </Box>
          <DistributorList
            distributors={distributors}
            tokenAddress={tokenAddress}
          />
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};

export default SelectDistributorsPageTemplate;
