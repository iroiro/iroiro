import * as React from "react";
import { Box, Typography, Paper } from "@material-ui/core";
import TokenListItem from "../../molecules/TokenListItem";
import { TokenListState } from "../../../interfaces";

export interface TokenListProps {
  readonly state: TokenListState;
}

const TokenList: React.FC<TokenListProps> = ({ state }) => (
  <div>
    <Box mt={5}>
      <Typography variant={"h4"}>Token List</Typography>
    </Box>
    {state.tokens.length === 0 ? (
      <Typography>You don&apos;t have any tokens</Typography>
    ) : (
      <Box mt={2}>
        <Paper>
          <Box p={2}>
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
        </Paper>
      </Box>
    )}
  </div>
);

export default TokenList;
