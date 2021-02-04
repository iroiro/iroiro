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
import { Box, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { AccountToken, Campaigns } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import CampaignList from "../../organisms/CampaignList";
import { AppFooter } from "../../molecules/AppFooter";

export interface ExternalTokenDetailPageTemplateProps {
  readonly active: boolean;
  readonly tokenState: AccountToken;
  readonly campaignsState: Campaigns;
}

const ExternalTokenDetailPageTemplate: React.FC<ExternalTokenDetailPageTemplateProps> = ({
  active,
  tokenState,
  campaignsState,
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
          {!active ? (
            <Box>
              <WalletConnect />
            </Box>
          ) : (
            <Box>
              <CampaignList
                tokenState={tokenState}
                campaignsState={campaignsState}
              />
            </Box>
          )}
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};

export default ExternalTokenDetailPageTemplate;
