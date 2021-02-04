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
import {
  Container,
  makeStyles,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";
import { useTokenContext } from "../../../context/token";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const TokenInformationBar: React.FC = () => {
  const classes = useStyles();
  const { state } = useTokenContext();

  return (
    <Container className={classes.container}>
      <Box display="flex" alignItems="flex-end" justifyContent="space-around">
        <Typography variant="h3">{state.token?.name ?? "-"}</Typography>
        <Box display="flex" alignItems="flex-end">
          <Box mr={4}>
            <Typography variant="caption">Your Balance</Typography>
            <Typography variant="h4">
              {!!state.userBalance && !!state
                ? getBalanceDevidedByDecimals(
                    state.userBalance,
                    state.token?.decimals ?? 0
                  )
                : "-"}
              {!!state.token?.symbol && " $" + state.token.symbol}
            </Typography>
          </Box>
          <EtherscanLink type="user" address={state.userAddress} />
        </Box>
      </Box>
    </Container>
  );
};

export default TokenInformationBar;
