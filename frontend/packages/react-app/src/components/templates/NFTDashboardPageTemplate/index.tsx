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

import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import { Campaigns } from "../../../interfaces";
import MenuButton from "../../atoms/MenuButton";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import CampaignListTable from "../../molecules/CampaignListTable";
import AppFrame from "../../organisms/AppFrame";
import distributors from "../../../utils/distributors";
import { useHistory } from "react-router-dom";
import { TokenState } from "../../../reducers/tokenContext";

export interface NFTDashboardPageTemplateProps {
  readonly campaignsState: Campaigns;
  readonly tokenState: TokenState;
  active: boolean;
}

const NFTDashboardPageTemplate: React.FC<NFTDashboardPageTemplateProps> = ({
  campaignsState,
  active,
  tokenState,
}) => {
  const history = useHistory();
  const walletDistributor = distributors.find(
    (distributor) => distributor.type === "wallet-nft"
  );
  const urlDistributor = distributors.find(
    (distributor) => distributor.type === "uuid-nft"
  );
  const emailDistributor = distributors.find(
    (distributor) => distributor.type === "email-nft"
  );

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
          {walletDistributor !== undefined && (
            <MenuButton
              key={`${walletDistributor.id}-${walletDistributor.type}`}
              title={walletDistributor.distributorMetadata.name}
              description={walletDistributor.distributorMetadata.description}
              color="creator"
              onClick={() =>
                history.push(
                  `/dashboard/distributors/${walletDistributor.id}/${walletDistributor.type}`
                )
              }
            />
          )}
          {urlDistributor !== undefined && (
            <MenuButton
              key={`${urlDistributor.id}-${urlDistributor.type}`}
              title={urlDistributor.distributorMetadata.name}
              description={urlDistributor.distributorMetadata.description}
              color="creator"
              onClick={() =>
                history.push(
                  `/dashboard/distributors/${urlDistributor.id}/${urlDistributor.type}`
                )
              }
            />
          )}
        </MenuButtonWrapper>
        <MenuButtonWrapper>
          {emailDistributor !== undefined && (
            <MenuButton
              key={`${emailDistributor.id}-${emailDistributor.type}`}
              title={emailDistributor.distributorMetadata.name}
              description={emailDistributor.distributorMetadata.description}
              color="creator"
              onClick={() =>
                history.push(
                  `/dashboard/distributors/${emailDistributor.id}/${emailDistributor.type}`
                )
              }
            />
          )}
        </MenuButtonWrapper>
        <Box mt={6}>
          <CampaignListTable
            campaignsState={campaignsState}
            walletConnect={active}
            tokenState={tokenState}
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

export default NFTDashboardPageTemplate;
