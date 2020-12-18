import React from "react";
import { Card, Box, Button, Heading } from "rimble-ui";
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
  <Card mt={2}>
    <Box m={"auto"} width={[3 / 4]}>
      <Heading>2. Approve your tokens</Heading>
      {tokenInfo.balance && tokenInfo.token ? (
        <TokenBalance
          balance={tokenInfo.balance}
          symbol={tokenInfo.token.symbol}
          itemName={"Wallet Balance:"}
        />
      ) : (
        <TokenBalance balance={"-"} symbol={""} itemName={"Wallet Balance:"} />
      )}
      {tokenInfo.allowance && tokenInfo.token ? (
        <TokenBalance
          balance={tokenInfo.allowance}
          symbol={tokenInfo.token.symbol}
          itemName={"Approved Amount:"}
        />
      ) : (
        <TokenBalance balance={"-"} symbol={""} itemName={"Approved Amount:"} />
      )}
      <ApproveTokenForm
        m={4}
        distributorFormState={distributorFormState}
        distributorFormDispatch={distributorFormDispatch}
      />
    </Box>
    <Box my={4} style={{ textAlign: "center" }}>
      <Button.Outline
        mr={4}
        mainColor="gray"
        onClick={() => {
          distributorFormDispatch({
            type: "step:set",
            payload: { stepNo: 1 },
          });
        }}
      >
        Back
      </Button.Outline>
      <Button
        mainColor="itblue"
        onClick={() => {
          distributorFormDispatch({
            type: "step:set",
            payload: { stepNo: 3 },
          });
        }}
      >
        Next
      </Button>
    </Box>
  </Card>
);

export default ApproveToken;
