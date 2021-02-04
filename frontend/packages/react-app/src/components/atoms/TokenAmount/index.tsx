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
import { PropTypes, Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

export interface TokenAmountProps {
  readonly amount: string;
  readonly decimals: number;
  readonly symbol?: string;
  readonly align: PropTypes.Alignment;
  readonly variant: Variant;
}

const TokenAmount: React.FC<TokenAmountProps> = ({
  amount,
  decimals,
  symbol,
  align,
  variant,
}) => {
  const processedAmount = getBalanceDevidedByDecimals(amount, decimals);
  const display = symbol ? `${processedAmount} $${symbol}` : processedAmount;

  return (
    <Typography align={align} variant={variant}>
      {display}
    </Typography>
  );
};

export default TokenAmount;
