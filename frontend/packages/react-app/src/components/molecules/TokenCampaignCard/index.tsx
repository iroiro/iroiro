import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
}

const TokenCampaignCard = ({ campaign }: TokenCampaignCardProps) => {
  return (
    <Grid item key={campaign.id} xs={12}>
      <Card>
        <CardHeader title={campaign.campaignMetadata.name} />
        <CardContent>
          {campaign.campaignMetadata && (
            <Typography>{campaign.campaignMetadata.description}</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TokenCampaignCard;
