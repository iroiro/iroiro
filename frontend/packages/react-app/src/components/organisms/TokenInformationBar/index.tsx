import * as React from "react";
import { TokenBasic, TokenInformationState } from "../../../interfaces";
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
  readonly token: TokenBasic | undefined;
  readonly userAddress: string | undefined;
  readonly userBalance: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

const TokenInformationBar: React.FC<TokenInformationBarProps> = ({
  token,
  userAddress,
  userBalance,
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
