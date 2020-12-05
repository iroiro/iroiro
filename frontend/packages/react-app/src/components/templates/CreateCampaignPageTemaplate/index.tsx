import React from "react";
import { Heading } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import DepositToken from "../../organisms/DepositToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken, Target } from "../../../interfaces";
import DistributionTargets from "../../organisms/DistributionTargets";

export interface CampaignInfo {
  readonly tokenInfo: AccountToken;
  readonly targets: Target[];
  readonly targetNumber: number;
}

const CreateCampaignPageTemaplate = ({
  tokenInfo,
  targets,
  targetNumber,
}: CampaignInfo) => (
  <div>
    <AppHeader />
    <Container>
      <Heading as={"h1"}>Audius Follower Campaign</Heading>
      <DistributionTargets targets={targets} targetNumber={targetNumber} />
      <DepositToken tokenInfo={tokenInfo} />
      <SetupCampaign />
    </Container>
  </div>
);

export default CreateCampaignPageTemaplate;
