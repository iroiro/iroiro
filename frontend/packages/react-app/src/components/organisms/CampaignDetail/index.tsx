import React from "react";
import { Card, CardContent, Container, Box } from "@material-ui/core";
import { CampaignData } from "../../../reducers/campaign";
import Item from "../../molecules/Item";

export interface CampaignDetailProps {
  readonly campaignData: CampaignData;
  readonly targetNumber: string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({
  campaignData,
  targetNumber,
}) => {
  return (
    <Card>
      <CardContent>
        <Container>
          {campaignData !== undefined && (
            <Box>
              <Box
                display="flex"
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {"campaignMetadata" in campaignData.campaign && (
                  <Item
                    title="Campaign Name"
                    text={campaignData.campaign.campaignMetadata.name}
                  />
                )}
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item
                  title="Campaign tokens balance"
                  text={campaignData.depositTokens}
                />
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {campaignData.campaign.status === 0 && (
                  <Item title="Status" text={"Active"} />
                )}
                {campaignData.campaign.status === 1 && (
                  <Item title="Status" text={"Canceled"} />
                )}
                {campaignData.campaign.status === 2 && (
                  <Item title="Status" text={"Ended"} />
                )}

                <Item
                  title="Start Date"
                  text={campaignData.campaign.startDate}
                />
                <Item title="End Date" text={campaignData.campaign.endDate} />
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                <Item title="Targets" text={targetNumber} />
                <Item
                  title="Claimed Number"
                  text={String(campaignData.campaign.claimedNum)}
                />
              </Box>
            </Box>
          )}
        </Container>
      </CardContent>
    </Card>
  );
};

export default CampaignDetail;
