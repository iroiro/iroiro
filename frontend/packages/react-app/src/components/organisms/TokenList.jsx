import React from "react";
import { Heading, Loader, Text, Box } from "rimble-ui";
import TokenListItem from "../molecules/TokenListItem";

const TokenList = ({ tokens }) => (
  <div>
    <Heading as={"h2"}>Token List</Heading>
    {tokens.length === "" &&
      <Loader size="80px" m="auto" />
    }
    {tokens.length == 0
      ? <Text>You don't have any tokens</Text>
      : <Box>
          {tokens.map(token => 
            <TokenListItem
              key={token.address}
              name={token.name}
              balance={token.balance}
              symbol={token.symbol}
              address={token.address}
            />
          )}
        </Box>
    }
  </div>
)

export default TokenList
