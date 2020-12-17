import React from "react";
import { Heading, Button, Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import CampaignDetail from "../../organisms/CampaignDetail";
import { AccountToken, Target, CampaignInfo } from "../../../interfaces";
import DistributionTargets from "../../organisms/DistributionTargets";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface CampaignInfoProps {
  readonly tokenInfo: AccountToken;
  readonly targets: Target[];
  readonly targetNumber: number;
  readonly campaignInfo: CampaignInfo;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const CampaignDetailPageTemaplate: React.FC<CampaignInfoProps> = ({
  targets,
  targetNumber,
  campaignInfo,
  audiusState,
  audiusDispatch,
}) => (
  <div>
    <AppHeader />
    <Container>
      <Heading as={"h1"}>Audius Follower Campaign</Heading>
      <DistributionTargets
        distributionTargets={targets}
        targetNumber={targetNumber}
        audiusState={audiusState}
        audiusDispatch={audiusDispatch}
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
