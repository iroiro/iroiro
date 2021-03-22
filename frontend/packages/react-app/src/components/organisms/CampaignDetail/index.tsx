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
import { Box, Grid } from "@material-ui/core";
import { CampaignData } from "../../../reducers/campaign";
import Item from "../../molecules/Item";
import NFTCampaignCard from "../../molecules/NFTCampaignCard";
import { getImageURLFromIPFSHash } from "../NFTCampaigns";
import { DistributorTypes } from "../../../interfaces";

export interface CampaignDetailProps {
  readonly campaignData: CampaignData;
  readonly distributorType: DistributorTypes | string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({
  campaignData,
  distributorType,
}) => {
  return (
    <>
      {(distributorType === "wallet-nft" || distributorType === "uuid-nft") &&
        campaignData !== undefined &&
        campaignData.campaign.campaignMetadata !== undefined && (
          <Grid container justify="center">
            <Grid xs={12} sm={4} item>
              <NFTCampaignCard
                name={campaignData.campaign.campaignMetadata.name}
                description={campaignData.campaign.campaignMetadata.description}
                image={getImageURLFromIPFSHash(
                  campaignData.campaign.campaignMetadata.image
                )}
              />
            </Grid>
          </Grid>
        )}
      {campaignData !== undefined && (
        <Box>
          {(distributorType === "wallet" || distributorType === "uuid") && (
            <>
              <Box
                display="flex"
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {"campaignMetadata" in campaignData.campaign && (
                  <Item
                    title="Campaign Name"
                    text={campaignData.campaign.campaignMetadata.name}
                  />
                )}
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {"campaignMetadata" in campaignData.campaign && (
                  <Item
                    title="Campaign Description"
                    text={campaignData.campaign.campaignMetadata.description}
                  />
                )}
              </Box>
            </>
          )}
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            {(distributorType === "wallet" || distributorType === "uuid") && (
              <Item
                title="Campaign tokens balance"
                text={campaignData.depositTokens}
              />
            )}
            <Item
              title="Claimed Number"
              text={String(campaignData.campaign.claimedNum)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CampaignDetail;
