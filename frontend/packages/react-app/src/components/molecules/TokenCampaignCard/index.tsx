import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { CampaignInfo } from "../../../interfaces";
import CampaignStatusChip from "../../atoms/CampaignStatusChip";
import styled from "styled-components";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenCampaignCardProps {
  readonly campaign: CampaignInfo;
  readonly dispatch: React.Dispatch<TokenInformationAction>;
}

const RelativeCard = styled(Card)`
  position: relative;
`;

const AbsoluteChip = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TokenCampaignCard = ({ campaign, dispatch }: TokenCampaignCardProps) => {
  const onClickDetail = () => {
    dispatch({
      type: "campaignAddress:set",
      payload: {
        campaignAddress: campaign.id,
      },
    });
  };

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
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onClickDetail()}
          >
            Detail
          </Button>
        </CardActions>
      </RelativeCard>
    </Grid>
  );
};

export default TokenCampaignCard;
