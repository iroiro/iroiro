import * as React from "react";
import { Heading, Text, Box } from "rimble-ui";
import TokenListItem from "../../molecules/TokenListItem";
import { TokenListState } from "../../../reducers/tokens";

export interface TokenListProps {
  readonly state: TokenListState;
}

const TokenList = ({ state }: TokenListProps) => (
  <div>
    <Heading as={"h2"} mt={5}>
      Token List
    </Heading>
    {state.tokens.length === 0 ? (
      <Text>You don't have any tokens</Text>
    ) : (
      <Box>
        {state.tokens.map((token) => (
          <TokenListItem
            key={token.tokenAddress}
            type={state.type}
            color={state.color}
            name={token.name}
            address={token.tokenAddress}
          />
        ))}
      </Box>
    )}
  </div>
);

export default TokenList;
