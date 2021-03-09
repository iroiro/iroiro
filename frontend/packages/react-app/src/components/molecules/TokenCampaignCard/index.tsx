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
  Box,
  CardActionArea,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import { useHistory } from "react-router-dom";
import theme from "../../../theme/mui-theme";
import styled from "styled-components";

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
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Title variant="h4">{campaign.campaignMetadata.name}</Title>
            </Box>
            <Box>
              {campaign.campaignMetadata &&
              campaign.campaignMetadata.description !== "" ? (
                <Description>
                  {campaign.campaignMetadata.description}
                </Description>
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

const Title = styled(Typography)`
  color: ${theme.palette.primary.main};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Description = styled.p`
  font-size: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default TokenCampaignCard;
