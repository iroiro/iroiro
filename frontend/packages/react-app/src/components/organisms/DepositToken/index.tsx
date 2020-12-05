import React from "react";
import { Card, Box, Flex, Text } from "rimble-ui";
import { AccountToken } from "../../../interfaces";
import DepositTokenForm from "../../molecules/DepositTokenForm";
import TokenBalance from "../../molecules/TokenBalance";

export interface TokenInfo {
  readonly tokenInfo: AccountToken;
}

const DepositToken = ({ tokenInfo }: TokenInfo) => (
  <Card>
    <Box m={"auto"} width={[3 / 4]}>
      <TokenBalance tokenInfo={tokenInfo} />
      <DepositTokenForm mt={4} />
    </Box>
  </Card>
);

export default DepositToken;
