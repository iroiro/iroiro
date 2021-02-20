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
import { CampaignInfo } from "../../../interfaces";
import { Typography, Box, Link } from "@material-ui/core";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";
import theme from "../../../theme/mui-theme";
import { useEffect, useState } from "react";

export interface TokenCampaignDetailProps {
  readonly campaign: CampaignInfo;
}

const TokenCampaignDetail: React.FC<TokenCampaignDetailProps> = ({
  campaign,
}) => {
  const [distributorType, setDistributorType] = useState("");
  useEffect(() => {
    switch (campaign.distributor.type) {
      case "wallet":
        setDistributorType("Wallet Address Type");
        break;
      case "uuid":
        setDistributorType("UUID Type");
        break;
      case "email":
        setDistributorType("Email Address Type");
        break;
      default:
        setDistributorType(campaign.distributor.type);
    }
  }, [campaign]);

  return (
    <>
      <div style={{ padding: theme.spacing(4) }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {campaign.campaignMetadata.name}
          </Typography>
          <CampaignStatusChip status={campaign.status} />
        </Box>
        <Box mt={2}>
          <Typography variant="caption" style={{ color: "#797979" }}>
            Description:
          </Typography>
          <Typography variant="body1">
            {campaign.campaignMetadata.description !== ""
              ? campaign.campaignMetadata.description
              : "No description"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="start" mt={1} mb={1}>
          <Box display="flex" justifyContent="start" alignItems="baseline">
            <Typography variant="caption" style={{ color: "#797979" }}>
              Start Date:
            </Typography>
            <Typography variant="body1">
              {new Date(
                parseInt(campaign.startDate) * 1000
              ).toLocaleDateString()}
            </Typography>
          </Box>
          <Box
            ml={4}
            display="flex"
            justifyContent="start"
            alignItems="baseline"
          >
            <Typography variant="caption" style={{ color: "#797979" }}>
              End Date:
            </Typography>
            <Typography variant="body1">
              {new Date(parseInt(campaign.endDate) * 1000).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="start" alignItems="baseline">
          <Typography variant="caption" style={{ color: "#797979" }}>
            Distributor Type:
          </Typography>
          <Typography variant="body1" style={{ paddingLeft: 8 }}>
            {distributorType}
          </Typography>
        </Box>
        <Box>
          {/* //TODO: ADD LINK */}
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            color="primary"
            variant="caption"
            style={{ textDecoration: "underline" }}
          >
            What’s distributor type?
          </Link>
        </Box>
      </div>
    </>
  );
};

export default TokenCampaignDetail;
