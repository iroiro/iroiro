import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationState } from "../../../interfaces";

export interface TokenCampaignsProps {
  readonly state: TokenInformationState;
}

const TokenCampaigns = ({ state: { campaigns } }: TokenCampaignsProps) => (
  <Grid container spacing={4} direction="column">
    {campaigns.length === 0 ? (
      <Typography>No campaigns for this Token yet.</Typography>
    ) : (
      <>
        {campaigns.map((campaign) => (
          <TokenCampaignCard campaign={campaign} />
        ))}
      </>
    )}
  </Grid>
);

export default TokenCampaigns;
