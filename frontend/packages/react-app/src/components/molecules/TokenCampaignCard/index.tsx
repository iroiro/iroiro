import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";
import styled from "styled-components";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
}

const RelativeCard = styled(Card)`
  position: relative;
`;

const AbsoluteChip = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TokenCampaignCard = ({ campaign }: TokenCampaignCardProps) => {
  return (
    <Grid item key={campaign.id} xs={12}>
      <RelativeCard>
        <AbsoluteChip>
          <CampaignStatusChip status={campaign.status} />
        </AbsoluteChip>
        <CardHeader title={campaign.campaignMetadata.name} />
        <CardContent>
          {campaign.campaignMetadata && (
            <Typography>{campaign.campaignMetadata.description}</Typography>
          )}
        </CardContent>
      </RelativeCard>
    </Grid>
  );
};

export default TokenCampaignCard;
