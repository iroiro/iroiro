import * as React from "react";
import { PropTypes, Typography } from "@material-ui/core";
import Decimal from "decimal.js";
import { Variant } from "@material-ui/core/styles/createTypography";

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
  const decimal = new Decimal(`${amount}e-${decimals}`);
  const display = symbol
    ? `${decimal.toString()} $${symbol}`
    : decimal.toString();

  return (
    <Typography align={align} variant={variant}>
      {display}
    </Typography>
  );
};

export default TokenAmount;
