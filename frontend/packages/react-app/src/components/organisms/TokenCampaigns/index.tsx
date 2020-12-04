import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationState } from "../../../interfaces";

export interface TokenCampaignsProps {
  readonly state: TokenInformationState;
}

const TokenCampaigns = ({
  state: { campaignInformationList },
}: TokenCampaignsProps) => (
  <Grid container spacing={4} direction="column">
    {campaignInformationList.length === 0 ? (
      <Typography>No campaigns for this Token yet.</Typography>
    ) : (
      <>
        {campaignInformationList.map((info) => (
          <TokenCampaignCard campaignInformation={info} />
        ))}
      </>
    )}
  </Grid>
);

export default TokenCampaigns;
