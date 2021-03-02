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
import { useEffect, useMemo } from "react";
import { AccountToken } from "../../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../../reducers/distributorForm";
import { ACTIONS } from "../../../../reducers/token";
import { useWeb3React } from "@web3-react/core";
import { useGetTokenInfo } from "../../../../hooks/useGetTokenInfo";
import { isAddress } from "ethers/lib/utils";
import {
  FlexWrapper,
  StyledStepperButton,
  TokenConfirmButton,
  TokenInput,
} from "../../../../theme/commonStyles";

export interface InputTokenAddressStepProps {
  readonly currentStep: number;
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const InputTokenAddressStep = ({
  currentStep,
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
}: InputTokenAddressStepProps) => {
  const { library } = useWeb3React();
  const { getTokenInfo, token, error } = useGetTokenInfo(
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

  const helperAddressText = useMemo(() => {
    if (isTokenAddressError) {
      return "Invalid address";
    }
    if (error !== undefined) {
      return "Can not fetch token information. It may be invalid address.";
    }
    return undefined;
  }, [isTokenAddressError, error]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "start",
          marginBottom: 16,
        }}
      >
        <FlexWrapper>
          <TokenInput
            error={helperAddressText !== undefined}
            helperText={helperAddressText}
            color="secondary"
            label="Token Address"
            style={{ width: 200, marginRight: 8 }}
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
      </div>
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
          onClick={() => handleStepChange(currentStep + 1)}
          disabled={tokenInfo.token === undefined}
        >
          Next
        </StyledStepperButton>
      </div>
    </>
  );
};

export default InputTokenAddressStep;
