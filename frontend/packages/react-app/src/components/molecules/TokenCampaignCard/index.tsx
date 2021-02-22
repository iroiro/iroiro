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
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Container,
  CardActionArea,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";
import { useHistory } from "react-router-dom";
import theme from "../../../theme/mui-theme";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
  readonly tokenAddress: string;
}

const TokenCampaignCard: React.FC<TokenCampaignCardProps> = ({
  campaign,
  tokenAddress,
}) => {
  const history = useHistory();
  const onClickDetail = () => {
    history.push(
      `/explore/${tokenAddress}/distributors/${campaign.distributor.id}/campaigns/${campaign.id}`
    );
  };

  return (
    <Card
      key={campaign.id}
      style={{ marginTop: "12px", borderColor: theme.palette.primary.main }}
      variant="outlined"
      onClick={onClickDetail}
    >
      <CardActionArea>
        <CardContent>
          <div>
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h4"
                style={{ color: theme.palette.primary.main }}
              >
                {campaign.campaignMetadata.name}
              </Typography>
              <CampaignStatusChip status={campaign.status} />
            </Box>
            <Box>
              {campaign.campaignMetadata &&
              campaign.campaignMetadata.description !== "" ? (
                <Typography>{campaign.campaignMetadata.description}</Typography>
              ) : (
                <Typography>-</Typography>
              )}
            </Box>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TokenCampaignCard;
