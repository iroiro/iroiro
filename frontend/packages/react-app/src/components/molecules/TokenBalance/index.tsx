import React from "react";
import { Box, Typography } from "@material-ui/core";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

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
        <Typography variant={"h4"}>
          {getBalanceDevidedByDecimals(balance, decimals)}
        </Typography>
      </Box>
      <Typography>{symbol}</Typography>
    </Box>
  </>
);

export default TokenBalance;
