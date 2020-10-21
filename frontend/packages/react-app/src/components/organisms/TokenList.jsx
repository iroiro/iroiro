import React from "react";
import { Heading, Loader } from "rimble-ui";
import TokenListItem from "../molecules/TokenListItem";

const TokenList = ({ tokens }) => (
  <div>
    <Heading as={"h2"}>Token List</Heading>
    {tokens.length == 0 &&
      <Loader size="80px" m="auto" mt={5}/>
    }
    {tokens.map(token => 
      <TokenListItem
        key={token.address}
        name={token.name}
        balance={token.balance}
        symbol={token.symbol}
        address={token.address}
      />
    )}
  </div>
)

export default TokenList
