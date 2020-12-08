import React from "react";
import { Heading, Button, Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import CampaignDetail from "../../organisms/CampaignDetail";
import { AccountToken, Target, CampaignInfo } from "../../../interfaces";
import DistributionTargets from "../../organisms/DistributionTargets";

export interface CampaignInfoProps {
  readonly tokenInfo: AccountToken;
  readonly targets: Target[];
  readonly targetNumber: number;
  readonly campaignInfo: CampaignInfo;
}

const CampaignDetailPageTemaplate = ({
  targets,
  targetNumber,
  campaignInfo,
}: CampaignInfoProps) => (
  <div>
    <AppHeader />
    <Container>
      <Heading as={"h1"}>Audius Follower Campaign</Heading>
      <DistributionTargets
        distributionTargets={targets}
        targetNumber={targetNumber}
      />
      <CampaignDetail campaignInfo={campaignInfo} />
      <Box mt={4} style={{ textAlign: "center" }}>
        <Button.Outline size="small" m="auto" mainColor="danger">
          Cancel campaign
        </Button.Outline>
      </Box>
    </Container>
  </div>
);

export default CampaignDetailPageTemaplate;
