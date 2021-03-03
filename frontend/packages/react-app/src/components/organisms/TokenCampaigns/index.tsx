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
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { CampaignInfo } from "../../../interfaces";
import { useEffect, useState } from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface TokenCampaignsProps {
  campaigns: CampaignInfo[];
  tokenAddress: string;
}

const TokenCampaigns: React.FC<TokenCampaignsProps> = ({
  campaigns,
  tokenAddress,
}) => {
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setFilteredCampaigns(campaigns);
  }, [campaigns]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredCampaigns(campaigns);
    } else {
      const filter = campaigns.filter((campaign) => {
        console.debug(campaign.creator.id, e.target.value);
        return (
          campaign.creator.id.toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setFilteredCampaigns(filter);
    }
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <TextField
          label="Search by Creator Address"
          value={searchText}
          onChange={handleChange}
          style={{ width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </SearchWrapper>
      <Grid container direction="column">
        {filteredCampaigns.length === 0 ? (
          <Box mt={4}>
            <Box p={8} textAlign="center">
              <Typography>No campaigns.</Typography>
            </Box>
          </Box>
        ) : (
          <StyledBox>
            {filteredCampaigns.map((campaign) => (
              <TokenCampaignCard
                key={campaign.id}
                campaign={campaign}
                tokenAddress={tokenAddress}
              />
            ))}
          </StyledBox>
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  ${theme.breakpoints.down(760)} {
    margin: 0 -26px;
  }
`;

const SearchWrapper = styled.div`
  padding: 32px 32px 0;
  ${theme.breakpoints.down(600)} {
    padding: 32px 8px 0;
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

export default TokenCampaigns;
