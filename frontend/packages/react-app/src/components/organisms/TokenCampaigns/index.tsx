import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationState } from "../../../interfaces";
import { TokenInformationTemplateProps } from "../../templates/TokenInformationTemplate";

export interface TokenCampaignsProps extends TokenInformationTemplateProps {}

const TokenCampaigns = ({
  state: { campaigns },
  dispatch,
}: TokenCampaignsProps) => (
  <Grid container spacing={4} direction="column">
    {campaigns.length === 0 ? (
      <Typography>No campaigns for this Token yet.</Typography>
    ) : (
      <>
        {campaigns.map((campaign) => (
          <TokenCampaignCard
            key={campaign.id}
            campaign={campaign}
            dispatch={dispatch}
          />
        ))}
      </>
    )}
  </Grid>
);

export default TokenCampaigns;
