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
import { Paper, Typography, Box, Button } from "@material-ui/core";
import { AccountToken } from "../../../interfaces";
import ApproveTokenForm from "../../molecules/ApproveTokenForm";
import TokenBalance from "../../molecules/TokenBalance";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import { UUID_ACTIONS } from "../../../reducers/uuid";

export interface TokenInfo {
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const ApproveToken: React.FC<TokenInfo> = ({
  tokenInfo,
  distributorFormState,
  distributorFormDispatch,
}) => (
  <Box mt={2}>
    <Paper>
      <Box p={4}>
        <Box m={"auto"} width={[3 / 4]} mt={2}>
          <Typography variant={"h4"}>2. Approve your tokens</Typography>
          <Box mt={2}>
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
            {tokenInfo.allowance && tokenInfo.token ? (
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
          <ApproveTokenForm
            m={4}
            distributorFormState={distributorFormState}
            distributorFormDispatch={distributorFormDispatch}
          />
        </Box>
        <Box
          display="flex"
          my={4}
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <Box mr={4}>
            <Button
              variant="outlined"
              color="default"
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 1 },
                });
              }}
            >
              Back
            </Button>
          </Box>
          <Box>
            {tokenInfo.allowance === "0" ? (
              <Button variant="contained" color="secondary" disabled>
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  distributorFormDispatch({
                    type: "step:set",
                    payload: { stepNo: 3 },
                  });
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  </Box>
);

export default ApproveToken;
