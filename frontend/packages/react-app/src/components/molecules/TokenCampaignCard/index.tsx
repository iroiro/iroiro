import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  Container,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
}

const TokenCampaignCard: React.FC<TokenCampaignCardProps> = ({ campaign }) => {
  const onClickDetail = () => {
    // dispatch({
    //   type: "campaignAddress:set",
    //   payload: {
    //     campaignAddress: campaign.id,
    //   },
    // });
  };

  return (
    <Card key={campaign.id} style={{ marginTop: "12px" }}>
      <CardContent>
        <Container>
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
            campaign.campaignMetadata.description !== "" ? (
              <Typography>{campaign.campaignMetadata.description}</Typography>
            ) : (
              <Typography>-</Typography>
            )}
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};

export default TokenCampaignCard;
