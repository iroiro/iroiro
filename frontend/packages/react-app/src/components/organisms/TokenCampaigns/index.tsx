import * as React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationTemplateProps } from "../../templates/TokenInformationTemplate";
import { TokenInformationState } from "../../../interfaces";
import { Dispatch } from "react";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenCampaignsProps extends TokenInformationTemplateProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
}

const TokenCampaigns: React.FC<TokenCampaignsProps> = ({
  state: { campaigns },
  dispatch,
}) => (
  <Grid container spacing={4} direction="column">
    {campaigns.length === 0 ? (
      <Typography>No campaigns for this Token yet.</Typography>
    ) : (
      <Box mt={4}>
        {campaigns.map((campaign) => (
          <TokenCampaignCard
            key={campaign.id}
            campaign={campaign}
            dispatch={dispatch}
          />
        ))}
      </Box>
    )}
  </Grid>
);

export default TokenCampaigns;
