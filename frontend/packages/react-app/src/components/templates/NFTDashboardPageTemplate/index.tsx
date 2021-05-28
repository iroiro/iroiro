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
import AppFrame from "../../organisms/AppFrame";
import distributors from "../../../utils/distributors";
import { useHistory } from "react-router-dom";
import NFTCampaignListTable from "../../molecules/NFTCampaignListTable";
import { MenuButtonWrapper } from "../DashboardPageTemplate";

export interface NFTDashboardPageTemplateProps {
  readonly campaignsState: Campaigns;
  readonly active: boolean;
}

const NFTDashboardPageTemplate: React.FC<NFTDashboardPageTemplateProps> = ({
  campaignsState,
  active,
}) => {
  const history = useHistory();
  const walletDistributor = distributors.find(
    (distributor) => distributor.type === "wallet-nft"
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
                  `/dashboard/nft/distributors/${walletDistributor.id}/${walletDistributor.type}`
                )
              }
            />
          )}
          <MenuButton
            title="⏳"
            description="Coming soon"
            color="creator"
            disabled={true}
          />
        </MenuButtonWrapper>
        <Box mt={6}>
          <NFTCampaignListTable
            campaignsState={campaignsState}
            walletConnect={active}
          />
        </Box>
      </AppFrame>
    </>
  );
};

export default NFTDashboardPageTemplate;
