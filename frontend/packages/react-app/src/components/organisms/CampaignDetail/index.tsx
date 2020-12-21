import React from "react";
import { Card, Flex, Box } from "rimble-ui";
import { CampaignInfo } from "../../../interfaces";
import Item from "../../molecules/Item";

export interface CampaignDetailProps {
  readonly campaignInfo: CampaignInfo;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignInfo }) => {
  return (
    <Card mt={2}>
      <Box>
        <Flex style={{ alignItems: "center", justifyContent: "left" }}>
          <Item
            title="Campaign Name"
            text={campaignInfo.campaignMetadata.name}
          />
        </Flex>
        <Flex mt={4} style={{ alignItems: "center", justifyContent: "left" }}>
          <Item
            title="Deposited tokens amount"
            text={campaignInfo.distributor.depositAmount}
          />
          <Item title="Claimed" text={campaignInfo.claimed.toString()} />
          <Item title="Start Date" text={campaignInfo.startDate} />
        </Flex>
      </Box>
    </Card>
  );
};

export default CampaignDetail;
