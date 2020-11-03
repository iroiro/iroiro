import React from "react";
import { Heading, Loader, Text, Box } from "rimble-ui";
import TokenListItem from "../molecules/TokenListItem";
import {UserToken} from "../../interfaces";

interface Props {
    readonly tokens: UserToken[]
    readonly loading: boolean
}

const TokenList = ({ tokens, loading }: Props) => (
  <div>
    <Heading as={"h2"}>Token List</Heading>
    {loading &&
      <Loader size="80px" m="auto" mt={5} color="itblue"/>
    }
    {!loading && tokens.length == 0
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
