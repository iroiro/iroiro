import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import { Box } from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";

export interface TokenInformationBarProps {
  readonly state: TokenInformationState;
}

const TokenInformationBar = ({
  state: { token, userAddress, userBalance },
}: TokenInformationBarProps) => (
  <div>
    <Box display="flex" flexDirection="row" p={1} m={1}>
      <Box p={1}>{!!token?.name ? token.name : "Loading token name..."}</Box>
      <Box p={1}>
        <Box component="span" display="block" p={1} m={1}>
          Your Balance
        </Box>
        <Box component="span" display="block" p={1} m={1}>
          {!!userBalance && userBalance} {!!token?.symbol && token.symbol}
        </Box>
      </Box>
      <Box p={1}>
        <EtherscanLink type="user" address={userAddress} />
      </Box>
    </Box>
  </div>
);

export default TokenInformationBar;
