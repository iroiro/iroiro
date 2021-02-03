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
  Card,
  CardContent,
  makeStyles,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
  link: {
    padding: theme.spacing(6, 0, 0),
  },
}));

export interface BasicTokenInformationProps {
  readonly state: TokenInformationState;
}

const BasicTokenInformation: React.FC<BasicTokenInformationProps> = ({
  state: { token },
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "24px" }}>
      <Card>
        <CardContent>
          <Container>
            {!token ? (
              <Box my={4}>
                <Typography>Loading Token information...</Typography>
              </Box>
            ) : (
              <>
                <Box display="flex" justifyContent="start" mt={2}>
                  <Box>
                    <Typography variant="subtitle1">Name:</Typography>
                    <Typography variant="h4">{token.name}</Typography>
                  </Box>
                  <Box ml={8}>
                    <Typography variant="subtitle1">Symbol:</Typography>
                    <Typography variant="h4">{token.symbol}</Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="start" my={2}>
                  <Box>
                    <Typography variant="subtitle1">Total Supply:</Typography>
                    <Typography variant="h4">
                      {getBalanceDevidedByDecimals(
                        token.totalSupply,
                        token.decimals
                      )}
                    </Typography>
                  </Box>
                  <Box ml={8}>
                    <Typography variant="subtitle1">Decimals:</Typography>
                    <Typography variant="h4">{token.decimals}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Container>
        </CardContent>
      </Card>
      <div className={classes.link}>
        {!!token && <EtherscanLink type="token" address={token.tokenAddress} />}
      </div>
    </div>
  );
};

export default BasicTokenInformation;
