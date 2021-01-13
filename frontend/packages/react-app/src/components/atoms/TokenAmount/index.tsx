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
