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

import React, { useMemo, useState } from "react";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import { upperLimit } from "../WalletDistributionTargets";
import { AccountToken } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { UUIDState, UUID_ACTIONS } from "../../../reducers/uuid";
import UUIDDistributionTargets from "../UUIDDistributionTargets";
import { Box, Typography } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import theme from "../../../theme/mui-theme";
import { ACTIONS } from "../../../reducers/token";
import InputTokenAddressStep from "../../molecules/steps/InputTokenAddressStep";
import ApproveTokenStep from "../../molecules/steps/ApproveTokenStep";
import StartCampaignStep from "../../molecules/steps/StartCampaignStep";
import {
  StartCampaignButton,
  StyledStepperButton,
  StyleStepper,
} from "../../../theme/commonStyles";

export interface CreateUUIDCampaignStepperProps {
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const CreateUUIDCampaignStepper = ({
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
  uuidState,
  uuidDispatch,
}: CreateUUIDCampaignStepperProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const urlList = useMemo(() => {
    const list = uuidState.rawTargets
      .map(
        (uuid) =>
          `${window.location.origin}${window.location.pathname}#/explore/${
            tokenInfo.token?.tokenAddress ?? ""
          }/distributors/${uuidState.distributorAddress}/campaigns/${
            distributorFormState.createdCampaignId
          }?uuid=${uuid}`
      )
      .join("\n");
    return list;
  }, [uuidState, distributorFormState, tokenInfo]);
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
          <StepLabel>
            Fill in the token address that you want to distribute
          </StepLabel>
          <StepContent>
            <InputTokenAddressStep
              currentStep={distributorFormState.step}
              tokenInfo={tokenInfo}
              tokenDispatch={tokenDispatch}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Input number of unique URLs</StepLabel>
          <StepContent>
            <div style={{ marginBottom: 16 }}>
              <UUIDDistributionTargets
                uuidState={uuidState}
                uuidDispatch={uuidDispatch}
              />
            </div>
            <Box mt={5}>
              <StyledStepperButton onClick={() => handleStepChange(0)}>
                Back
              </StyledStepperButton>
              <StyledStepperButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={
                  uuidState.quantity <= 0 || upperLimit < uuidState.quantity
                }
                onClick={() => {
                  uuidDispatch({ type: "targets:generate" });
                  handleStepChange(2);
                }}
              >
                Next
              </StyledStepperButton>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Approve your tokens</StepLabel>
          <StepContent>
            <ApproveTokenStep
              currentStep={distributorFormState.step}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
              recipients={uuidState.targets.length}
              tokenInfo={tokenInfo}
            />
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
        <Step>
          <StepLabel>URL List</StepLabel>
          <StepContent>
            <div>
              <Box mt={2} mb={4}>
                <Typography variant={"body1"} style={{ lineHeight: "1.2" }}>
                  A campaign is created successfully and
                  <span
                    style={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                      display: "inline-block",
                      padding: "0 4px",
                    }}
                  >
                    {uuidState.rawTargets.length}
                  </span>
                  campaign URLs are generated for your fans.
                </Typography>
                <Typography>
                  Copy and distribute it! Please note, this URL will be deleted
                  after you move from this page, so please be careful.
                </Typography>
              </Box>
            </div>
            <Box mt={5}>
              <CopyToClipboard text={urlList} onCopy={() => setIsCopied(true)}>
                <StyledStepperButton
                  color="secondary"
                  variant="contained"
                  disableElevation
                >
                  Copy URLs to clipboard
                </StyledStepperButton>
              </CopyToClipboard>
              <StartCampaignButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={!isCopied}
                onClick={() => {
                  uuidDispatch({ type: "moveToCampaignPage:on" });
                }}
              >
                Go to Campaign Detail
              </StartCampaignButton>
            </Box>
          </StepContent>
        </Step>
      </StyleStepper>
    </div>
  );
};

export default CreateUUIDCampaignStepper;
