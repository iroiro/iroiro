import React from "react";
import { Box, Typography } from "@material-ui/core";

export interface TokenInfo {
  readonly balance: string;
  readonly symbol: string;
  readonly itemName: string;
}

const TokenBalance: React.FC<TokenInfo> = ({ balance, symbol, itemName }) => (
  <>
    <Box display="flex" style={{ alignItems: "baseline" }}>
      <Box mr={4}>
        <Typography>{itemName}</Typography>
      </Box>
      <Box mr={1}>
        <Typography variant={"h4"}>{balance}</Typography>
      </Box>
      <Typography>{symbol}</Typography>
    </Box>
  </>
);

export default TokenBalance;
