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

import { Box, Container } from "@material-ui/core";
import React, { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AppFooter } from "../../molecules/AppFooter";
import AppHeader from "../../molecules/AppHeader";
import BasicTokenInformation from "../../organisms/BasicTokenInformation";
import TokenInformationBar from "../../organisms/TokenInformationBar";

export interface TokenBasicInformationProps {
  tokenAddress: string;
}

export const TokenBasicInformationTemplate: React.FC<TokenBasicInformationProps> = ({
  tokenAddress,
}) => {
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(0);
  const handleChangeTabs = useCallback(
    (n: number) => {
      setTabNumber(n);
      switch (n) {
        case 1:
          history.push(`/explore/${tokenAddress}/campaigns/`);
          break;
        case 4:
          history.push(`/explore/${tokenAddress}/history`);
          break;
        default:
          break;
      }
    },
    [tabNumber, tokenAddress]
  );
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Box
        m={"auto"}
        minWidth={320}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 190px)",
          minHeight: "600px",
        }}
      >
        <TokenInformationBar />
        <Container maxWidth="md">
          <Box style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
            <BasicTokenInformation />
          </Box>
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};
