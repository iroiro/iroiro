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

import React, { useEffect, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
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
import { useWeb3React } from "@web3-react/core";
import { useGetTokenInfo } from "../../../hooks/useGetTokenInfo";
import { isAddress } from "ethers/lib/utils";
import {
  FlexWrapper,
  StartCampaignButton,
  StyledStepperButton,
  StyleStepper,
  TokenConfirmButton,
  TokenInput,
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
            distributorFormState.createdCampaignAddress
          }?uuid=${uuid}`
      )
      .join("\n");
    return list;
  }, [uuidState, distributorFormState, tokenInfo]);
  const { library } = useWeb3React();
  const { getTokenInfo, token } = useGetTokenInfo(
    library,
    distributorFormState.tokenAddress
  );

  const handleStepChange = (stepNumber: number) => {
    distributorFormDispatch({
      type: "step:set",
      payload: { stepNo: stepNumber },
    });
  };

  useEffect(() => {
    if (token === undefined) {
      return;
    }
    tokenDispatch({
      type: "token:set",
      payload: {
        token,
      },
    });
  }, [token, tokenDispatch]);

  const isTokenAddressError =
    distributorFormState.tokenAddress !== "" &&
    !isAddress(distributorFormState.tokenAddress);

  return (
    <div>
      <StyleStepper
        activeStep={distributorFormState.step}
        orientation="vertical"
      >
        <Step>
          <StepLabel>
            Fill in Token address that you want to distribute
          </StepLabel>
          <StepContent>
            <FlexWrapper>
              <TokenInput
                error={isTokenAddressError}
                helperText={isTokenAddressError ? "Invalid address" : undefined}
                color="secondary"
                label="Token Address"
                value={distributorFormState.tokenAddress}
                onChange={(e) => {
                  distributorFormDispatch({
                    type: "tokenAddress:set",
                    payload: {
                      tokenAddress: e.target.value,
                    },
                  });
                  tokenDispatch({
                    type: "token:set",
                    payload: {
                      token: undefined,
                    },
                  });
                }}
              />
              <TokenConfirmButton
                color="secondary"
                variant="outlined"
                onClick={() => getTokenInfo()}
                disabled={isTokenAddressError}
              >
                Confirm
              </TokenConfirmButton>
            </FlexWrapper>
            {tokenInfo.token?.name !== undefined &&
              tokenInfo.token?.name !== "" && (
                <div style={{ padding: "8px 16px 0", fontWeight: "bold" }}>
                  {tokenInfo.token?.name}
                </div>
              )}
            <div style={{ marginTop: 40 }}>
              <StyledStepperButton
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => handleStepChange(1)}
                disabled={tokenInfo.token === undefined}
              >
                Next
              </StyledStepperButton>
            </div>
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
            <div>
              <ApproveToken
                tokenInfo={tokenInfo}
                distributorFormState={distributorFormState}
                distributorFormDispatch={distributorFormDispatch}
              />
            </div>
            <div>
              <StyledStepperButton onClick={() => handleStepChange(1)}>
                Back
              </StyledStepperButton>
              <StyledStepperButton
                variant="contained"
                color="secondary"
                disableElevation
                disabled={tokenInfo.allowance === "0"}
                onClick={() => handleStepChange(3)}
              >
                Next
              </StyledStepperButton>
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
              <StyledStepperButton onClick={() => handleStepChange(2)}>
                Back
              </StyledStepperButton>
              <StartCampaignButton
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
              </StartCampaignButton>
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
                <StyledStepperButton
                  color="secondary"
                  variant="contained"
                  disableElevation
                >
                  Copy URLs to clipboard
                </StyledStepperButton>
              </CopyToClipboard>
            </div>
            <Box mt={5}>
              <StyledStepperButton onClick={() => handleStepChange(3)}>
                Back
              </StyledStepperButton>
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
