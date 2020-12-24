import * as React from "react";
import { Grid, Typography, Box, Paper } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationProps } from "../../organisms/TokenInformationTabs";

const TokenCampaigns: React.FC<TokenInformationProps> = ({
  state: { campaigns },
  dispatch,
}) => (
  <Grid container spacing={4} direction="column">
    {campaigns.length === 0 ? (
      <Box mt={4}>
        <Paper>
          <Box p={8} textAlign="center">
            <Typography>No campaigns for this Token yet.</Typography>
          </Box>
        </Paper>
      </Box>
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
