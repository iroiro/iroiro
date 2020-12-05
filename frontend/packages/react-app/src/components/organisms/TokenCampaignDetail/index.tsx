import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";

export interface TokenCampaignDetailProps {
  readonly state: TokenInformationState;
  readonly campaignAddress: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const TokenCampaignDetail = ({
  state: { campaigns },
  campaignAddress,
}: TokenCampaignDetailProps) => {
  const classes = useStyles();

  const campaign = campaigns.find(
    (campaign) => campaign.id === campaignAddress
  );

  if (!campaign) {
    return (
      <div>
        <Typography>Campaign not found.</Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Paper className={classes.container}>
          <Typography variant="h4" component="h2">
            {campaign.campaignMetadata.name}
          </Typography>
          <Typography>Name: {campaign.campaignMetadata.description}</Typography>
          <Typography>
            Start Date:{" "}
            {new Date(parseInt(campaign.startDate) * 1000).toLocaleDateString()}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TokenCampaignDetail;
