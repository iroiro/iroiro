import React from "react";
import { Box, Typography } from "@material-ui/core";
import TokenAmount from "../../atoms/TokenAmount";

export interface TokenInfo {
  readonly balance: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly itemName: string;
}

const TokenBalance: React.FC<TokenInfo> = ({
  balance,
  decimals,
  symbol,
  itemName,
}) => (
  <>
    <Box display="flex" style={{ alignItems: "baseline" }}>
      <Box mr={4}>
        <Typography>{itemName}</Typography>
      </Box>
      <Box mr={1}>
        <TokenAmount
          amount={balance}
          decimals={decimals}
          symbol={symbol}
          align={"left"}
          variant={"h4"}
        />
      </Box>
    </Box>
  </>
);

export default TokenBalance;
