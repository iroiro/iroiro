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
import AppHeader from "../../molecules/AppHeader";
import TokenCampaigns from "../../organisms/TokenCampaigns";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";
import { AppFooter } from "../../molecules/AppFooter";
import TokenInfoBar from "../../molecules/TokenInfoBar";

export interface TokenCampaignsTemplateProps {
  state: TokenCampaignsState;
  tokenAddress: string;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
  tokenAddress,
}) => {
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
        <Container maxWidth="md">
          <Box
            style={{
              boxSizing: "border-box",
              padding: 24,
              maxWidth: 860,
              margin: "0 auto",
              minWidth: 320,
            }}
          >
            <TokenInfoBar />
            <TabMenuForFanPage
              tokenAddress={tokenAddress}
              current={"campaigns"}
            />
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
