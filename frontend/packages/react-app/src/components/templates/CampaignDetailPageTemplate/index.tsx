import React from "react";
import { Heading, Button, Box, Flex } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import CampaignDetail from "../../organisms/CampaignDetail";
import { AccountToken } from "../../../interfaces";
import { CampaignData } from "../../../reducers/campaign";
import { ACTIONS } from "../../../reducers/campaign";

export interface CampaignInfoProps {
  readonly tokenInfo: AccountToken;
  readonly targetNumber: string;
  readonly campaignData: CampaignData;
  campaignDispatch: React.Dispatch<ACTIONS>;
}

const CampaignDetailPageTemplate: React.FC<CampaignInfoProps> = ({
  targetNumber,
  campaignData,
  campaignDispatch,
}) => (
  <div>
    <AppHeader />
    <Container>
      <Flex style={{ justifyContent: "space-between" }}>
        <Heading as={"h1"}>Audius Follower Campaign</Heading>
        <Box mt={4} style={{ textAlign: "center" }}>
          {campaignData.campaign.status === 0 && !campaignData.canRefund && (
            <Button.Outline
              size="small"
              m="auto"
              mainColor="danger"
              onClick={() =>
                campaignDispatch({
                  type: "campaign:cancel",
                  payload: { data: true },
                })
              }
            >
              Cancel campaign
            </Button.Outline>
          )}
          {campaignData.canRefund && (
            <Button.Outline
              size="small"
              m="auto"
              mainColor="itblue"
              onClick={() =>
                campaignDispatch({
                  type: "campaign:refund",
                  payload: { data: true },
                })
              }
            >
              End campaign and refund tokens
            </Button.Outline>
          )}
        </Box>
      </Flex>
      <CampaignDetail campaignData={campaignData} targetNumber={targetNumber} />
    </Container>
  </div>
);

export default CampaignDetailPageTemplate;
