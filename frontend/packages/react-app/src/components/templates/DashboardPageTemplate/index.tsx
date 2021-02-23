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
import { Box, Typography } from "@material-ui/core";
import { Campaigns } from "../../../interfaces";
import MenuButton from "../../atoms/MenuButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import CampaignListTable from "../../molecules/CampaignListTable";
import { TokenOption } from "../../atoms/SelectTokenInput";
import AppFrame from "../../organisms/AppFrame";

export interface DashboardPageTemplateProps {
  readonly campaignsState: Campaigns;
  readonly creatorTokenList: TokenOption[];
  active: boolean;
}

const DashboardPageTemplate: React.FC<DashboardPageTemplateProps> = ({
  campaignsState,
  active,
  creatorTokenList,
}) => {
  return (
    <>
      <AppFrame>
        <Typography
          variant={"h3"}
          style={{ fontWeight: 300, textAlign: "center", marginBottom: 32 }}
        >
          CREATE NEW CAMPAIGN WITH...
        </Typography>
        <MenuButtonWrapper>
          {/* TODO: Remove console.log */}
          <MenuButton
            title="Wallet address Distributor"
            description="To distribute tokens to a list of addresses that you have."
            color="creator"
            onClick={() =>
              console.log("Link to Wallet Address Distributor page")
            }
          />
          <MenuButton
            title="URL Distributor"
            description="To distribute tokens with a unique URL per user."
            color="creator"
            onClick={() => console.log("Link to URL Distributor page")}
          />
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          <MenuButton
            title="Email Distributor"
            description="To distribute tokens to a list of Email addresses that you have."
            color="creator"
            onClick={() =>
              console.log("Link to Email Address Distributor page")
            }
          />
          <MenuButton
            title="⏳"
            description="Coming soon"
            color="creator"
            disabled={true}
          />
        </MenuButtonWrapper>
        <Box mt={6}>
          <CampaignListTable
            campaignsState={campaignsState}
            walletConnect={active}
            creatorTokenList={creatorTokenList}
          />
        </Box>
      </AppFrame>
    </>
  );
};

const MenuButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  & > div {
    width: 49.5%;
    ${theme.breakpoints.down(600)} {
      width: 100%;
      margin-bottom: 16px;
    }
  }
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export default DashboardPageTemplate;
