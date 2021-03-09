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
import Button from "@material-ui/core/Button";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../../reducers/distributorForm";
import SetupCampaign from "../../../organisms/SetupCampaign";
import { StyledStepperButton } from "../../../../theme/commonStyles";

export interface StartCampaignStepProps {
  readonly currentStep: number;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const StartCampaignStep = ({
  currentStep,
  distributorFormState,
  distributorFormDispatch,
}: StartCampaignStepProps) => {
  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  return (
    <>
      <div>
        <SetupCampaign
          distributorFormState={distributorFormState}
          distributorFormDispatch={distributorFormDispatch}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        <StyledStepperButton onClick={() => handleStepChange(currentStep - 1)}>
          Back
        </StyledStepperButton>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            distributorFormDispatch({
              type: "campaign:deploy",
              payload: { requestDeployCampaign: true },
            });
            distributorFormDispatch({
              type: "dialog:set",
              payload: { dialog: "waiting-api" },
            });
          }}
          disabled={
            distributorFormState.campaignName === "" ||
            distributorFormState.isEndDatePast
          }
        >
          Start Campaign
        </Button>
      </div>
    </>
  );
};

export default StartCampaignStep;
