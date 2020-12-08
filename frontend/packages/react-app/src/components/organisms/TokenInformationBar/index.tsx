import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import {
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
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
      <Grid container spacing={5}>
        <Grid item xs>
          <Typography variant="h4" component="h1">
            {!token?.name ? "Loading token name..." : token.name}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography>Your Balance</Typography>
          <Typography variant="h6">
            {!!userBalance && !!token
              ? getBalanceDevidedByDecimals(userBalance, token.decimals)
              : "Loading balance..."}
            {" $"}
            {!!token?.symbol && token.symbol}
          </Typography>
        </Grid>
        <Grid item xs>
          <EtherscanLink type="user" address={userAddress} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TokenInformationBar;
