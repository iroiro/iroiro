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

import React, { useCallback, useState } from "react";
import AppHeader from "../../molecules/AppHeader";
import TokenCampaigns from "../../organisms/TokenCampaigns";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import { useHistory } from "react-router-dom";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";
import { AppFooter } from "../../molecules/AppFooter";

export interface TokenCampaignsTemplateProps {
  state: TokenCampaignsState;
  tokenAddress: string;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(1);
  const handleChangeTabs = useCallback(
    (n: number) => {
      setTabNumber(n);
      switch (n) {
        case 0:
          history.push(`/explore/${tokenAddress}`);
          break;
        case 4:
          history.push(`/explore/${tokenAddress}/history/`);
          break;
        default:
          break;
      }
    },
    [tabNumber, tokenAddress]
  );
  return (
    <div style={{ height: "100%", minHeight: "100vh" }}>
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
        <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
        <Container maxWidth="md">
          <Box
            style={{
              padding: 24,
              maxWidth: 860,
              margin: "0 auto",
              minWidth: 320,
            }}
          >
            <TokenCampaigns
              campaigns={state.campaigns}
              tokenAddress={tokenAddress}
            />
          </Box>
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};
