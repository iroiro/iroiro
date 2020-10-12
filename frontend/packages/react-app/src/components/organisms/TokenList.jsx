import React from "react";
import TokenListItem from "../molecules/TokenListItem";

const TokenList = ({ name, balance, symbol }) => (
  <div>
    <TokenListItem
      name={name}
      balance={balance}
      symbol={symbol}
    />
  </div>
)

export default TokenList
