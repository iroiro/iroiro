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
import { Grid, Typography, Box } from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import NFTTokenCampaignCard from "../../molecules/NFTCampaignCard";
import { useHistory } from "react-router-dom";

export interface NFTCampaignsProps {
  readonly campaigns: CampaignInfo[];
  readonly isOnlyView?: boolean;
}

export const getImageURLFromIPFSHash = (image: string): string => {
  return image.startsWith("ipfs://")
    ? `https://gateway.pinata.cloud/ipfs/${image.split("ipfs://")[1]}`
    : "";
};
const NFTCampaigns: React.FC<NFTCampaignsProps> = ({
  campaigns,
  isOnlyView,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      {/*<Grid container>*/}
      <Grid container>
        {campaigns.length === 0 ? (
          <Box mt={4}>
            <Box p={8} textAlign="center">
              <Typography>No campaigns.</Typography>
            </Box>
          </Box>
        ) : (
          <>
            {campaigns.map((campaign) => {
              const image = getImageURLFromIPFSHash(
                campaign.campaignMetadata.image
              );
              const pair = campaign.id.split("-");
              const viewParam = isOnlyView === true ? "?isOnlyView" : "";
              return (
                <Grid key={campaign.id} item xs={12} sm={4}>
                  <StyledBox>
                    <NFTTokenCampaignCard
                      name={campaign.campaignMetadata.name}
                      description={campaign.campaignMetadata.description}
                      image={image}
                      onClickActionArea={() =>
                        history.push(
                          `/explore/nft/distributors/${pair[0]}/campaigns/${pair[1]}${viewParam}`
                        )
                      }
                    />
                  </StyledBox>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  background-color: #fff;
  ${theme.breakpoints.down(760)} {
    margin: 0 -26px;
  }
`;

const StyledBox = styled(Box)`
  box-sizing: border-box;
  margin-top: 16px;
  padding: 0 32px 32px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
    padding: 8px;
  }
`;

export default NFTCampaigns;
