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
import { TokenInformationState } from "../../../interfaces";
import {
  Container,
  makeStyles,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

export interface TokenInformationBarProps {
  readonly state: TokenInformationState;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const TokenInformationBar: React.FC<TokenInformationBarProps> = ({
  state: { token, userAddress, userBalance },
}: TokenInformationBarProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Box display="flex" alignItems="flex-end" justifyContent="space-around">
        <Typography variant="h3">{!token?.name ? "-" : token.name}</Typography>
        <Box display="flex" alignItems="flex-end">
          <Box mr={4}>
            <Typography variant="caption">Your Balance</Typography>
            <Typography variant="h4">
              {!!userBalance && !!token
                ? getBalanceDevidedByDecimals(userBalance, token.decimals)
                : "-"}
              {!!token?.symbol && " $" + token.symbol}
            </Typography>
          </Box>
          <EtherscanLink type="user" address={userAddress} />
        </Box>
      </Box>
    </Container>
  );
};

export default TokenInformationBar;
