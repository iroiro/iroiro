/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
