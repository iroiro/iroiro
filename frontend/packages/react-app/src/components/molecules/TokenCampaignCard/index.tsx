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
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
  readonly dispatch: React.Dispatch<TokenInformationAction>;
}

const TokenCampaignCard: React.FC<TokenCampaignCardProps> = ({
  campaign,
  dispatch,
}) => {
  const onClickDetail = (distributorAddress: string) => {
    let type = "";
    if (distributorAddress === "0x590b4465a94be635bf2f760025c61ec3680f687c") {
      type = "audius";
    }
    if (distributorAddress === "0xb562cf605a0f8a123bf7abfdfe1317671a8b5ead") {
      type = "wallet";
    }
    dispatch({
      type: "campaignAddress:set",
      payload: {
        campaignAddress: campaign.id,
        distributorType: type,
      },
    });
  };

  return (
    <Card key={campaign.id} style={{ marginTop: "12px" }}>
      <CardContent>
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Link
              component="button"
              onClick={() => onClickDetail(campaign.distributor.id)}
            >
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
