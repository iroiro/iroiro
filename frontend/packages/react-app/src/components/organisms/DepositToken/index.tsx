import React from "react";
import { Card, Box } from "rimble-ui";
import { AccountToken } from "../../../interfaces";
import DepositTokenForm from "../../molecules/DepositTokenForm";
import TokenBalance from "../../molecules/TokenBalance";

export interface TokenInfo {
  readonly tokenInfo: AccountToken;
}

const DepositToken = ({ tokenInfo }: TokenInfo) => (
  <Card mt={2}>
    <Box m={"auto"} width={[3 / 4]}>
      <TokenBalance tokenInfo={tokenInfo} />
      <DepositTokenForm m={4} />
    </Box>
  </Card>
);

export default DepositToken;
