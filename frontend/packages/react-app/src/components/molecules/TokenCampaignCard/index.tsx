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
import { useHistory, withRouter } from "react-router-dom";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
  readonly tokenAddress: string;
}

const TokenCampaignCard: React.FC<TokenCampaignCardProps> = ({
  campaign,
  tokenAddress,
}) => {
  const history = useHistory();
  const onClickDetail = () => {
    history.push(`/explore/${tokenAddress}/campaigns/${campaign.id}`);
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
