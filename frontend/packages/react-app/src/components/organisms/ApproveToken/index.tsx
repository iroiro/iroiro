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
import { Box } from "@material-ui/core";
import { AccountToken } from "../../../interfaces";
import ApproveTokenForm from "../../molecules/ApproveTokenForm";
import TokenBalance from "../../molecules/TokenBalance";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface TokenInfo {
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
  readonly recipients: number;
  readonly tokenInfo: AccountToken;
}

const ApproveToken: React.FC<TokenInfo> = ({
  distributorFormState,
  distributorFormDispatch,
  recipients,
  tokenInfo,
}) => (
  <>
    <Box>
      <Box mt={2}>
        <Box mb={1}>
          {tokenInfo.balance && tokenInfo.token ? (
            <TokenBalance
              balance={tokenInfo.balance}
              symbol={tokenInfo.token.symbol}
              decimals={tokenInfo.token.decimals}
              itemName={"Wallet Balance:"}
            />
          ) : (
            <TokenBalance
              balance={"-"}
              symbol={""}
              decimals={0}
              itemName={"Wallet Balance:"}
            />
          )}
        </Box>
        {tokenInfo.allowance !== "0" && (
          <Box>
            {tokenInfo.allowance !== undefined && tokenInfo.token ? (
              <TokenBalance
                balance={tokenInfo.allowance}
                symbol={tokenInfo.token.symbol}
                decimals={tokenInfo.token.decimals}
                itemName={"Approved Amount:"}
              />
            ) : (
              <TokenBalance
                balance={"-"}
                symbol={""}
                decimals={0}
                itemName={"Approved Amount:"}
              />
            )}
          </Box>
        )}
      </Box>
      <ApproveTokenForm
        distributorFormState={distributorFormState}
        distributorFormDispatch={distributorFormDispatch}
        tokenInfo={tokenInfo}
        recipients={recipients}
      />
    </Box>
  </>
);

export default ApproveToken;
