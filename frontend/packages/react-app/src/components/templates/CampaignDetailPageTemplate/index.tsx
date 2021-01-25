import React from "react";
import { Box, Typography, Button, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import AppHeader from "../../molecules/AppHeader";
import CampaignDetail from "../../organisms/CampaignDetail";
import { AccountToken } from "../../../interfaces";
import { CampaignData } from "../../../reducers/campaign";
import { ACTIONS } from "../../../reducers/campaign";

export interface CampaignInfoProps {
  readonly tokenInfo: AccountToken;
  readonly targetNumber: string;
  readonly campaignData: CampaignData;
  campaignDispatch: React.Dispatch<ACTIONS>;
  readonly distributorType: string;
}

const ColorButton = withStyles(() => ({
  root: {
    color: red[500],
  },
}))(Button);

const CampaignDetailPageTemplate: React.FC<CampaignInfoProps> = ({
  targetNumber,
  campaignData,
  campaignDispatch,
  distributorType,
}) => (
  <div>
    <AppHeader />
    <Box mt={5}>
      <Container>
        <Box display="flex" mb={1} style={{ justifyContent: "space-between" }}>
          {distributorType === "audius" && (
            <Typography variant={"h3"}>Audius Follower Campaign</Typography>
          )}
          {distributorType === "wallet" && (
            <Typography variant={"h3"}>Wallet Address Distributor</Typography>
          )}
          <Box style={{ textAlign: "center" }}>
            {campaignData.campaign.status === 0 && !campaignData.canRefund && (
              <ColorButton
                variant="outlined"
                size="small"
                onClick={() =>
                  campaignDispatch({
                    type: "campaign:cancel",
                    payload: { data: true },
                  })
                }
              >
                Cancel campaign
              </ColorButton>
            )}
            {campaignData.canRefund && (
              <Button
                size="small"
                color="secondary"
                onClick={() =>
                  campaignDispatch({
                    type: "campaign:refund",
                    payload: { data: true },
                  })
                }
              >
                End campaign and refund tokens
              </Button>
            )}
          </Box>
        </Box>
        <CampaignDetail
          campaignData={campaignData}
          targetNumber={targetNumber}
        />
      </Container>
    </Box>
  </div>
);

export default CampaignDetailPageTemplate;
