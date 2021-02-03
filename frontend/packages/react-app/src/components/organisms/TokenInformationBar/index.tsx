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
