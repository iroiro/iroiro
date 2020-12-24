import * as React from "react";
import { CampaignInfo } from "../../../interfaces";
import { makeStyles, Paper, Theme, Typography, Box } from "@material-ui/core";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";

export interface TokenCampaignDetailProps {
  readonly campaign: CampaignInfo;
}

// TODO Integrate styled-components theme
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const TokenCampaignDetail: React.FC<TokenCampaignDetailProps> = ({
  campaign,
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "24px" }}>
      <Paper className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            {campaign.campaignMetadata.name}
          </Typography>
          <CampaignStatusChip status={campaign.status} />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Description:</Typography>
          <Typography variant="body1">
            {campaign.campaignMetadata.description !== ""
              ? campaign.campaignMetadata.description
              : "No description"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="start" mt={2}>
          <Box>
            <Typography variant="subtitle1">Start Date:</Typography>
            <Typography variant="h5">
              {new Date(
                parseInt(campaign.startDate) * 1000
              ).toLocaleDateString()}
            </Typography>
          </Box>
          <Box ml={8}>
            <Typography variant="subtitle1">End Date:</Typography>
            <Typography variant="h5">
              {new Date(parseInt(campaign.endDate) * 1000).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default TokenCampaignDetail;
