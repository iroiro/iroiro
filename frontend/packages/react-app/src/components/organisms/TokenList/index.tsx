import * as React from "react";
import { Heading, Loader, Text, Box } from "rimble-ui";
import TokenListItem from "../../molecules/TokenListItem";
import { UserToken } from "../../../interfaces";
// import { Link } from "react-router-dom";

export interface TokenListProps {
  readonly tokens: UserToken[];
  readonly loading: boolean;
}

const TokenList = ({ tokens, loading }: TokenListProps) => (
  <div>
    <Heading as={"h2"}>Token List</Heading>
    {loading && <Loader size="80px" m="auto" mt={5} color="itblue" />}
    {!loading && tokens.length === 0 ? (
      <Text>You don't have any tokens</Text>
    ) : (
      <Box>
        {tokens.map((token) => (
          <TokenListItem
            key={token.address}
            name={token.name}
            address={token.address}
          />
        ))}
      </Box>
    )}
  </div>
);

export default TokenList;
