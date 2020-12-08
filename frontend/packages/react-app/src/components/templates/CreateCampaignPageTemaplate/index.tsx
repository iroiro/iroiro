import React from "react";
import { Heading, Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import DepositToken from "../../organisms/DepositToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken, Target } from "../../../interfaces";
import DistributionTargets from "../../organisms/DistributionTargets";
import WalletConnect from "../../organisms/WalletConnect";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenInfo: AccountToken;
  readonly targets: Target[];
  readonly targetNumber: number;
}

const CreateCampaignPageTemaplate: React.FC<CampaignInfo> = ({
  active,
  tokenInfo,
  targets,
  targetNumber,
}) => (
  <div>
    <AppHeader />
    <Container>
      {!active ? (
        <Box>
          <WalletConnect />
        </Box>
      ) : (
        <Box>
          <Heading as={"h1"}>Audius Follower Campaign</Heading>
          <DistributionTargets
            distributionTargets={targets}
            targetNumber={targetNumber}
          />
          <DepositToken tokenInfo={tokenInfo} />
          <SetupCampaign />
        </Box>
      )}
    </Container>
  </div>
);

export default CreateCampaignPageTemaplate;
