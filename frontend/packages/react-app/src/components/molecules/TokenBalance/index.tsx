import React from "react";
import { Flex, Text } from "rimble-ui";
import { AccountToken } from "../../../interfaces";

export interface TokenInfo {
  readonly tokenInfo: AccountToken;
}

const TokenBalance: React.FC<TokenInfo> = ({ tokenInfo }) => (
  <>
    <Flex style={{ alignItems: "baseline" }}>
      <Text mr={4}>Balance:</Text>
      <Text mr={1} fontSize={5} fontWeight={"bold"}>
        {tokenInfo.balance}
      </Text>
      <Text fontSize={3} fontWeight={"bold"}>
        {tokenInfo.token.symbol}
      </Text>
    </Flex>
  </>
);

export default TokenBalance;
