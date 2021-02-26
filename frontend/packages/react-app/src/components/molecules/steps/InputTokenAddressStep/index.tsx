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
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { AccountToken } from "../../../../interfaces";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../../reducers/distributorForm";
import styled from "styled-components";
import { ACTIONS } from "../../../../reducers/token";
import { useWeb3React } from "@web3-react/core";
import { useGetTokenInfo } from "../../../../hooks/useGetTokenInfo";
import { isAddress } from "ethers/lib/utils";

export interface InputTokenAddressStepProps {
  readonly tokenInfo: AccountToken;
  readonly tokenDispatch: React.Dispatch<ACTIONS>;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const InputTokenAddressStep = ({
  tokenInfo,
  tokenDispatch,
  distributorFormState,
  distributorFormDispatch,
}: InputTokenAddressStepProps) => {
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
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "start",
          marginBottom: 16,
        }}
      >
        <TextField
          error={isTokenAddressError}
          helperText={isTokenAddressError ? "Invalid address" : undefined}
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
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => getTokenInfo()}
          disabled={isTokenAddressError}
        >
          Confirm
        </Button>
      </div>
      {tokenInfo.token?.name !== "" && (
        <div style={{ padding: "8px 16px 0", fontWeight: "bold" }}>
          {tokenInfo.token?.name}
        </div>
      )}
      <div style={{ marginTop: 40 }}>
        <StyledButton
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => handleStepChange(1)}
          disabled={tokenInfo.token === undefined}
        >
          Next
        </StyledButton>
      </div>
    </>
  );
};

const StyledButton = styled(Button)`
  width: 140px;
  margin-right: 8px;
`;

export default InputTokenAddressStep;
