import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import { Box, Grid, Typography } from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";

export interface TokenInformationBarProps {
  readonly state: TokenInformationState;
}

const TokenInformationBar = ({
  state: { token, userAddress, userBalance },
}: TokenInformationBarProps) => (
  <div>
    <Grid container spacing={5}>
      <Grid item xs>
        {!!token?.name ? token.name : "Loading token name..."}
      </Grid>
      <Grid item xs>
        <Typography>Your Balance</Typography>
        <Typography>
          {!!userBalance ? userBalance : "Loading balnce..."}{" "}
          {!!token?.symbol && token.symbol}
        </Typography>
      </Grid>
      <Grid item xs>
        <EtherscanLink type="user" address={userAddress} />
      </Grid>
    </Grid>
  </div>
);

export default TokenInformationBar;
