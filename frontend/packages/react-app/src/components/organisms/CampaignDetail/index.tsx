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
import { CampaignData } from "../../../reducers/campaign";
import Item from "../../molecules/Item";

export interface CampaignDetailProps {
  readonly campaignData: CampaignData;
  readonly targetNumber: string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({
  campaignData,
  targetNumber,
}) => {
  return (
    <>
      {campaignData !== undefined && (
        <Box>
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
            <Item
              title="Campaign tokens balance"
              text={campaignData.depositTokens}
            />
          </Box>
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            {campaignData.campaign.status === 0 && (
              <Item title="Status" text={"Active"} />
            )}
            {campaignData.campaign.status === 1 && (
              <Item title="Status" text={"Canceled"} />
            )}
            {campaignData.campaign.status === 2 && (
              <Item title="Status" text={"Ended"} />
            )}

            <Item
              title="Start Date"
              text={new Date(
                parseInt(campaignData.campaign.startDate) * 1000
              ).toLocaleDateString()}
            />
            <Item
              title="End Date"
              text={new Date(
                parseInt(campaignData.campaign.endDate) * 1000
              ).toLocaleDateString()}
            />
          </Box>
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            <Item title="Targets" text={targetNumber} />
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
