import React from "react";
import { Heading } from "rimble-ui";
import TokenListItem from "../molecules/TokenListItem";

const TokenList = ({ name, balance, symbol }) => (
  <div>
    <Heading as={"h2"}>Token List</Heading>
    <TokenListItem
      name={name}
      balance={balance}
      symbol={symbol}
    />
  </div>
)

export default TokenList
