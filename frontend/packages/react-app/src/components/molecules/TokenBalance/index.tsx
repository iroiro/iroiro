import React from "react";
import { Flex, Text } from "rimble-ui";

export interface TokenInfo {
  readonly balance: string;
  readonly symbol: string;
  readonly itemName: string;
}

const TokenBalance: React.FC<TokenInfo> = ({ balance, symbol, itemName }) => (
  <>
    <Flex style={{ alignItems: "baseline" }}>
      <Text mr={4}>{itemName}</Text>
      <Text mr={1} fontSize={4} fontWeight={"bold"}>
        {balance}
      </Text>
      <Text fontSize={2} fontWeight={"bold"}>
        {symbol}
      </Text>
    </Flex>
  </>
);

export default TokenBalance;
