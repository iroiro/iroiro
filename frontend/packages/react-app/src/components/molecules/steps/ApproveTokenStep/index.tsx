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
import { AccountToken } from "../../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../../reducers/distributorForm";
import ApproveToken from "../../../organisms/ApproveToken";
import { StyledStepperButton } from "../../../../theme/commonStyles";

export interface ApproveTokenStepProps {
  readonly currentStep: number;
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const ApproveTokenStep = ({
  currentStep,
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
}: ApproveTokenStepProps) => {
  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  return (
    <>
      <div>
        <ApproveToken
          tokenInfo={tokenInfo}
          distributorFormState={distributorFormState}
          distributorFormDispatch={distributorFormDispatch}
        />
      </div>
      <div>
        <StyledStepperButton onClick={() => handleStepChange(currentStep - 1)}>
          Back
        </StyledStepperButton>
        <StyledStepperButton
          variant="contained"
          color="secondary"
          disableElevation
          disabled={tokenInfo.allowance === "0"}
          onClick={() => handleStepChange(currentStep + 1)}
        >
          Next
        </StyledStepperButton>
      </div>
    </>
  );
};

export default ApproveTokenStep;
