import * as React from "react";
import { Card, CardContent, Typography, Link, Box } from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";
import styled from "styled-components";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
  readonly dispatch: React.Dispatch<TokenInformationAction>;
}

const TokenCampaignCard: React.FC<TokenCampaignCardProps> = ({
  campaign,
  dispatch,
}) => {
  const onClickDetail = () => {
    dispatch({
      type: "campaignAddress:set",
      payload: {
        campaignAddress: campaign.id,
      },
    });
  };

  return (
    <Card key={campaign.id} style={{ marginTop: "12px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Link component="button" onClick={() => onClickDetail()}>
            <Typography variant="h5">
              {campaign.campaignMetadata.name}
            </Typography>
          </Link>
          <CampaignStatusChip status={campaign.status} />
        </Box>
        <Box mt={2}>
          {campaign.campaignMetadata &&
          campaign.campaignMetadata.description != "" ? (
            <Typography>{campaign.campaignMetadata.description}</Typography>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TokenCampaignCard;
