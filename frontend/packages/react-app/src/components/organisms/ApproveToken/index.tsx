import React from "react";
import { Paper, Typography, Box, Button } from "@material-ui/core";
import { AccountToken } from "../../../interfaces";
import ApproveTokenForm from "../../molecules/ApproveTokenForm";
import TokenBalance from "../../molecules/TokenBalance";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface TokenInfo {
  readonly tokenInfo: AccountToken;
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
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
                itemName={"Wallet Balance:"}
              />
            ) : (
              <TokenBalance
                balance={"-"}
                symbol={""}
                itemName={"Wallet Balance:"}
              />
            )}
            {tokenInfo.allowance && tokenInfo.token ? (
              <TokenBalance
                balance={tokenInfo.allowance}
                symbol={tokenInfo.token.symbol}
                itemName={"Approved Amount:"}
              />
            ) : (
              <TokenBalance
                balance={"-"}
                symbol={""}
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
