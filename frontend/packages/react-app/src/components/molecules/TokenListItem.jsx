import React from "react";
import { Box } from "rimble-ui";

const TokenListItem = ({ name, balance, symbol }) => (
  <Box>
    {name}
    {balance}
    {symbol}
  </Box>
)

export default TokenListItem
