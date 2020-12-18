import * as React from "react";
import { CampaignInfo } from "../../../interfaces";
import { Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import styled from "styled-components";
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

const RelativeContainer = styled.div`
  position: relative;
`;

const AbsoluteChip = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TokenCampaignDetail: React.FC<TokenCampaignDetailProps> = ({
  campaign,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <RelativeContainer>
          <AbsoluteChip>
            <CampaignStatusChip status={campaign.status} />
          </AbsoluteChip>
          <Paper className={classes.container}>
            <Typography variant="h4" component="h2">
              {campaign.campaignMetadata.name}
            </Typography>
            <Typography>
              Name: {campaign.campaignMetadata.description}
            </Typography>
            <Typography>
              Start Date:{" "}
              {new Date(
                parseInt(campaign.startDate) * 1000
              ).toLocaleDateString()}
            </Typography>
          </Paper>
        </RelativeContainer>
      </Grid>
    </Grid>
  );
};

export default TokenCampaignDetail;
