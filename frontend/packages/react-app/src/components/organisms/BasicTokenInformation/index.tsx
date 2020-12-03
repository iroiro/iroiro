import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import { Card, CardContent, Typography } from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";

export interface BasicTokenInformationProps {
  readonly state: TokenInformationState;
}

const BasicTokenInformation = ({
  state: { token },
}: BasicTokenInformationProps) => (
  <div>
    <Typography variant="h4" component="h2">
      Basic Information
    </Typography>
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
    {!!token && <EtherscanLink address={token.tokenAddress} />}
  </div>
);

export default BasicTokenInformation;
