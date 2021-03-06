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

import React from "react";
import { Box, Typography } from "@material-ui/core";
import TokenAmount from "../../atoms/TokenAmount";

export interface TokenInfo {
  readonly balance: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly itemName: string;
}

const TokenBalance: React.FC<TokenInfo> = ({
  balance,
  decimals,
  symbol,
  itemName,
}) => (
  <>
    <Box display="flex" style={{ alignItems: "baseline" }}>
      <Box mr={4}>
        <Typography variant="caption">{itemName}</Typography>
      </Box>
      <Box mr={1}>
        <TokenAmount
          amount={balance}
          decimals={decimals}
          symbol={symbol}
          align={"left"}
          variant={"h4"}
        />
      </Box>
    </Box>
  </>
);

export default TokenBalance;
