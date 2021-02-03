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
import { makeStyles, Paper, Theme, Typography, Box } from "@material-ui/core";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";

export interface TokenCampaignDetailProps {
  readonly campaign: CampaignInfo;
}

// TODO Integrate styled-components theme
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const TokenCampaignDetail: React.FC<TokenCampaignDetailProps> = ({
  campaign,
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "24px" }}>
      <Paper className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {campaign.campaignMetadata.name}
          </Typography>
          <CampaignStatusChip status={campaign.status} />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Description:</Typography>
          <Typography variant="body1">
            {campaign.campaignMetadata.description !== ""
              ? campaign.campaignMetadata.description
              : "No description"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="start" mt={2}>
          <Box>
            <Typography variant="subtitle1">Start Date:</Typography>
            <Typography variant="h5">
              {new Date(
                parseInt(campaign.startDate) * 1000
              ).toLocaleDateString()}
            </Typography>
          </Box>
          <Box ml={8}>
            <Typography variant="subtitle1">End Date:</Typography>
            <Typography variant="h5">
              {new Date(parseInt(campaign.endDate) * 1000).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default TokenCampaignDetail;
