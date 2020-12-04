import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { CampaignInformation } from "../../../interfaces";

export interface TokenCampaignCardProps {
  readonly campaignInformation: CampaignInformation;
}

const TokenCampaignCard = ({ campaignInformation }: TokenCampaignCardProps) => {
  return (
    <Grid item key={campaignInformation.address} xs={12}>
      <Card>
        <CardHeader title={campaignInformation.name} />
        <CardContent>
          {campaignInformation && (
            <Typography>
              description: {campaignInformation.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TokenCampaignCard;
