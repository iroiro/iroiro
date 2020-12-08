import React from "react";
import { Card, Flex, Box, Text } from "rimble-ui";
import { CampaignInfo } from "../../../interfaces";

export interface CampaignDetailProps {
  readonly campaignInfo: CampaignInfo;
}

const CampaignDetail = ({ campaignInfo }: CampaignDetailProps) => {
  return (
    <Card mt={2}>
      <Box>
        <Flex style={{ alignItems: "center", justifyContent: "left" }}>
          <Box>
            <Text fontSize={2} color="gray">
              Campaign Name
            </Text>
            <Text fontSize={3} fontWeight="bold">
              {campaignInfo.campaignMetadata.name}
            </Text>
          </Box>
        </Flex>
        <Flex mt={4} style={{ alignItems: "center", justifyContent: "left" }}>
          <Box>
            <Text fontSize={2} color="gray">
              Deposited tokens amount
            </Text>
            <Text fontSize={3} fontWeight="bold">
              {campaignInfo.distributor.depositAmount}
            </Text>
          </Box>
          <Box ml={4}>
            <Text fontSize={2} color="gray">
              Claimed
            </Text>
            <Text fontSize={3} fontWeight="bold">
              {campaignInfo.claimed}
            </Text>
          </Box>
          <Box ml={4}>
            <Text fontSize={2} color="gray">
              Start Date
            </Text>
            <Text fontSize={3} fontWeight="bold">
              {campaignInfo.startDate}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};

export default CampaignDetail;
