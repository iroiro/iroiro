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
import AppHeader from "../../molecules/AppHeader";
import { Campaigns } from "../../../interfaces";
import { AppFooter } from "../../molecules/AppFooter";
import MenuButton from "../../atoms/MenuButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import CampaignListTable from "../../molecules/CampaignListTable";
import { TokenOption } from "../../atoms/SelectTokenInput";

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
    <div>
      <AppHeader />
      <Box
        m={"auto"}
        my={5}
        p={2}
        width={[4 / 5, 1 / 2]}
        minWidth={320}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 266px)",
          minHeight: "300px",
        }}
      >
        <Typography
          variant={"h3"}
          style={{ fontWeight: 300, textAlign: "center", marginBottom: 32 }}
        >
          CREATE NEW CAMPAIGN WITH...
        </Typography>
        <MenuButtonWrapper>
          <MenuButton
            title="Wallet address Distributor"
            description="To distribute tokens to a list of addresses that you have."
            color="creator"
          />
          <MenuButton
            title="URL Distributor"
            description="To distribute tokens with a unique URL per user."
            color="creator"
          />
        </MenuButtonWrapper>
        <Box mt={6}>
          <CampaignListTable
            campaignsState={campaignsState}
            walletConnect={active}
            creatorTokenList={creatorTokenList}
          />
        </Box>
      </Box>
      <AppFooter />
    </div>
  );
};

const MenuButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
