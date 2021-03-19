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

import * as React from "react";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import WalletDistributionTargets, {
  upperLimit,
} from "../WalletDistributionTargets";
import { WalletList } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { WALLET_ACTIONS } from "../../../reducers/wallet";
import StartCampaignStep from "../../molecules/steps/StartCampaignStep";
import { StyledStepperButton, StyleStepper } from "../../../theme/commonStyles";

export interface CreateWalletNFTCampaignStepperProps {
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly walletListState: WalletList;
  readonly walletDispatch: React.Dispatch<WALLET_ACTIONS>;
}

const CreateWalletNFTCampaignStepper = ({
  distributorFormState,
  distributorFormDispatch,
  walletListState,
  walletDispatch,
}: CreateWalletNFTCampaignStepperProps) => {
  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  return (
    <div>
      <StyleStepper
        activeStep={distributorFormState.step}
        orientation="vertical"
      >
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
              <StyledStepperButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={
                  walletListState.targets.length === 0 ||
                  upperLimit < walletListState.targets.length
                }
                onClick={() => handleStepChange(1)}
              >
                Next
              </StyledStepperButton>
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Setup basic info</StepLabel>
          <StepContent>
            <StartCampaignStep
              currentStep={distributorFormState.step}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
            />
          </StepContent>
        </Step>
      </StyleStepper>
    </div>
  );
};

export default CreateWalletNFTCampaignStepper;
