/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import React from "react";
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import WalletDistributionTargets, {
  upperLimit,
} from "../WalletDistributionTargets";
import { AccountToken, WalletList } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { WALLET_ACTIONS } from "../../../reducers/wallet";
import styled from "styled-components";
import ApproveToken from "../ApproveToken";
import SetupCampaign from "../SetupCampaign";
import { ACTIONS } from "../../../reducers/token";
import InputTokenAddressStep from "../../molecules/steps/InputTokenAddressStep";

export interface CreateWalletAddressCampaignStepperProps {
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly walletListState: WalletList;
  readonly walletDispatch: React.Dispatch<WALLET_ACTIONS>;
}

const CreateWalletAddressCampaignStepper = ({
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
  walletListState,
  walletDispatch,
}: CreateWalletAddressCampaignStepperProps) => {
  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  return (
    <div>
      <Stepper
        activeStep={distributorFormState.step}
        orientation="vertical"
        style={{ maxWidth: 680 }}
      >
        <Step>
          <StepLabel>
            Fill in Token address that you want to distribute
          </StepLabel>
          <StepContent>
            <InputTokenAddressStep
              tokenInfo={tokenInfo}
              tokenDispatch={tokenDispatch}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Upload Address List</StepLabel>
          <StepContent>
            <div style={{ marginBottom: 16 }}>
              <WalletDistributionTargets
                walletListState={walletListState}
                walletDispatch={walletDispatch}
              />
            </div>
            <div>
              <StyledButton onClick={() => handleStepChange(0)}>
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={
                  walletListState.targets.length === 0 ||
                  upperLimit < walletListState.targets.length
                }
                onClick={() => handleStepChange(2)}
              >
                Next
              </StyledButton>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Approve your tokens</StepLabel>
          <StepContent>
            <div>
              <ApproveToken
                tokenInfo={tokenInfo}
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            </div>
            <div>
              <StyledButton onClick={() => handleStepChange(1)}>
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={tokenInfo.allowance === "0"}
                onClick={() => handleStepChange(3)}
              >
                Next
              </StyledButton>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Setup basic info</StepLabel>
          <StepContent>
            <div>
              <SetupCampaign
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            </div>
            <div style={{ marginTop: 40 }}>
              <StyledButton onClick={() => handleStepChange(2)}>
                Back
              </StyledButton>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => {
                  distributorFormDispatch({
                    type: "campaign:deploy",
                    payload: { requestDeployCampaign: true },
                  });
                }}
                disabled={
                  distributorFormState.startDate >=
                    distributorFormState.endDate ||
                  distributorFormState.campaignName === ""
                }
              >
                Start Campaign
              </Button>
            </div>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

const StyledButton = styled(Button)`
  width: 140px;
  margin-right: 8px;
`;

export default CreateWalletAddressCampaignStepper;
