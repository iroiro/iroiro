import * as React from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { Dispatch, useState } from "react";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { CampaignInfo } from "../../../interfaces";

export interface TokenCampaignsProps {
  campaigns: CampaignInfo[];
  dispatch: Dispatch<TokenInformationAction>;
}

const TokenCampaigns: React.FC<TokenCampaignsProps> = ({
  campaigns,
  dispatch,
}) => {
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);
  const [searchText, setSearchText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredCampaigns(campaigns);
    } else {
      const filter = campaigns.filter((campaign) => {
        return campaign.creator.id === e.target.value;
      });
      setFilteredCampaigns(filter);
    }
  };

  return (
    <>
      <div style={{ padding: "24px 0 8px" }}>
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
      </div>
      <Grid container>
        {filteredCampaigns.length === 0 ? (
          <Box mt={4} width={"100%"}>
            <Paper>
              <Box p={8} textAlign="center">
                <Typography>No campaigns.</Typography>
              </Box>
            </Paper>
          </Box>
        ) : (
          <Box mt={4} width={"100%"}>
            {filteredCampaigns.map((campaign) => (
              <TokenCampaignCard
                key={campaign.id}
                campaign={campaign}
                dispatch={dispatch}
              />
            ))}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default TokenCampaigns;
