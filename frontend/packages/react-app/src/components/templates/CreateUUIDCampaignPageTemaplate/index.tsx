import * as React from "react";
import { Box, Typography, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import ApproveToken from "../../organisms/ApproveToken";
import SetupCampaign from "../../organisms/SetupCampaign";
import { AccountToken } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import UUIDDistributionTargets from "../../organisms/UUIDDistributionTargets";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";
import UUIDURLList from "../../organisms/UUIDURLList";

export interface CampaignInfo {
  readonly active: boolean;
  readonly tokenAddress: string;
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const CreateUUIDCampaignPageTemplate: React.FC<CampaignInfo> = ({
  active,
  tokenAddress,
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
  uuidState,
  uuidDispatch,
}) => (
  <div>
    <AppHeader />
    <Box mt={5}>
      <Container>
        {!active ? (
          <Box>
            <WalletConnect />
          </Box>
        ) : (
          <Box>
            <Box my={1}>
              <Typography variant={"h3"}>URL Campaign</Typography>
            </Box>
            {distributorFormState.step === 1 && (
              <UUIDDistributionTargets
                uuidState={uuidState}
                uuidDispatch={uuidDispatch}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
            {distributorFormState.step === 2 && (
              <ApproveToken
                tokenInfo={tokenInfo}
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
            {distributorFormState.step === 3 && (
              <SetupCampaign
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            )}
            {distributorFormState.step === 4 && (
              <UUIDURLList
                tokenAddress={tokenAddress}
                campaignAddress={distributorFormState.createdCampaignAddress}
                uuidState={uuidState}
                uuidDispatch={uuidDispatch}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  </div>
);

export default CreateUUIDCampaignPageTemplate;
