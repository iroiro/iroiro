import React from "react";
import { Heading, Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import Container from "../../atoms/Container";
import ApproveToken from "../../organisms/ApproveToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken, Target } from "../../../interfaces";
import DistributionTargets from "../../organisms/DistributionTargets";
import WalletConnect from "../../organisms/WalletConnect";
import { ACTIONS } from "../../../reducers/token";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenInfo: AccountToken;
  readonly targets: Target[];
  readonly targetNumber: number;
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: React.Dispatch<AUDIUS_ACTIONS>;
}

const CreateCampaignPageTemaplate: React.FC<CampaignInfo> = ({
  active,
  tokenInfo,
  targets,
  targetNumber,
  distributorFormState,
  distributorFormDispatch,
  audiusState,
  audiusDispatch,
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
            audiusState={audiusState}
            audiusDispatch={audiusDispatch}
          />
          <ApproveToken
            tokenInfo={tokenInfo}
            distributorFormState={distributorFormState}
            distributorFormDispatch={distributorFormDispatch}
          />
          <SetupCampaign
            distributorFormState={distributorFormState}
            distributorFormDispatch={distributorFormDispatch}
          />
        </Box>
      )}
    </Container>
  </div>
);

export default CreateCampaignPageTemaplate;
