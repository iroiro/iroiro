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

import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
import WalletDistributionTargets, {
  upperLimit,
} from "../WalletDistributionTargets";
import { AccountToken, WalletList } from "../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { WALLET_ACTIONS } from "../../../reducers/wallet";
import ApproveToken from "../ApproveToken";
import SetupCampaign from "../SetupCampaign";
import { useGetTokenInfo } from "../../../hooks/useGetTokenInfo";
import { useWeb3React } from "@web3-react/core";
import { ACTIONS } from "../../../reducers/token";
import { isAddress } from "ethers/lib/utils";
import {
  FlexWrapper,
  StartCampaignButton,
  StyledStepperButton,
  StyleStepper,
  TokenConfirmButton,
  TokenInput,
} from "../../../theme/commonStyles";

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
  const { library } = useWeb3React();
  const { getTokenInfo, token } = useGetTokenInfo(
    library,
    distributorFormState.tokenAddress
  );

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
            {tokenInfo.token?.name !== "" && (
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
          <StepLabel>Upload Address List</StepLabel>
          <StepContent>
            <div style={{ marginBottom: 16 }}>
              <WalletDistributionTargets
                walletListState={walletListState}
                walletDispatch={walletDispatch}
              />
            </div>
            <div>
              <StyledStepperButton onClick={() => handleStepChange(0)}>
                Back
              </StyledStepperButton>
              <StyledStepperButton
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
              </StyledStepperButton>
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
      </StyleStepper>
    </div>
  );
};

export default CreateWalletAddressCampaignStepper;
