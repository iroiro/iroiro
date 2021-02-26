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
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { upperLimit } from "../WalletDistributionTargets";
import { AccountToken } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import styled from "styled-components";
import ApproveToken from "../ApproveToken";
import SetupCampaign from "../SetupCampaign";
import { UUIDState, UUID_ACTIONS } from "../../../reducers/uuid";
import UUIDDistributionTargets from "../UUIDDistributionTargets";
import { Box, Typography } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import theme from "../../../theme/mui-theme";
import { ACTIONS } from "../../../reducers/token";
import InputTokenAddressStep from "../../molecules/steps/InputTokenAddressStep";
import ApproveTokenStep from "../../molecules/steps/ApproveTokenStep";

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
            distributorFormState.createdCampaignAddress
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
          <StepLabel>Input number of unique URLs</StepLabel>
          <StepContent>
            <div style={{ marginBottom: 16 }}>
              <UUIDDistributionTargets
                uuidState={uuidState}
                uuidDispatch={uuidDispatch}
              />
            </div>
            <Box mt={5}>
              <StyledButton onClick={() => handleStepChange(0)}>
                Back
              </StyledButton>
              <StyledButton
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
              </StyledButton>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Approve your tokens</StepLabel>
          <StepContent>
            <ApproveTokenStep
              tokenInfo={tokenInfo}
              distributorFormState={distributorFormState}
              distributorFormDispatch={distributorFormDispatch}
            />
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
            <div>
              <CopyToClipboard text={urlList} onCopy={() => setIsCopied(true)}>
                <Button color="secondary" variant="contained" disableElevation>
                  Copy URLs to clipboard
                </Button>
              </CopyToClipboard>
            </div>
            <Box mt={5}>
              <StyledButton onClick={() => handleStepChange(3)}>
                Back
              </StyledButton>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                disabled={!isCopied}
                onClick={() => {
                  uuidDispatch({ type: "moveToCampaignPage:on" });
                }}
              >
                Go to Campaign Detail
              </Button>
            </Box>
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

export default CreateUUIDCampaignStepper;
