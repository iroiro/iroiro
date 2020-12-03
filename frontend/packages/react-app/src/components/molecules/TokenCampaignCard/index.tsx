import * as React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";

export interface CampaignInformation {
  readonly name: string;
  readonly description: string;
  readonly image?: string;
}

export interface TokenCampaignCardProps {
  readonly campaignInformation: CampaignInformation;
}

const TokenCampaignCard = ({ campaignInformation }: TokenCampaignCardProps) => {
  return (
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
  );
};

export default TokenCampaignCard;
