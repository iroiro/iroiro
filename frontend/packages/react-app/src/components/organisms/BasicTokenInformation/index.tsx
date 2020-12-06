import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";

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

const BasicTokenInformation = ({
  state: { token },
}: BasicTokenInformationProps) => {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardContent>
          {!!token ? (
            <>
              <Typography>Name: {token.name}</Typography>
              <Typography>Symbol: {token.symbol}</Typography>
              <Typography>Total Supply: {token.totalSupply}</Typography>
            </>
          ) : (
            <Typography>Loading Token information...</Typography>
          )}
        </CardContent>
      </Card>
      <div className={classes.link}>
        {!!token && <EtherscanLink type="token" address={token.tokenAddress} />}
      </div>
    </div>
  );
};

export default BasicTokenInformation;
