import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Text } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenInfo } from "../../../reducers/token";
import WalletConnect from "../../organisms/WalletConnect";

interface ExternalTokenDetailPageTemplateProps {
  readonly state: TokenInfo;
}

const ExternalTokenDetailPageTemplate = ({
  state,
}: ExternalTokenDetailPageTemplateProps) => {
  const { active } = useWeb3React();
  return (
    <div>
      <AppHeader />
      {active ? (
        <Box m={"auto"} my={5} width={[4 / 5, 3 / 4]}>
          <Text>{state.token.name}</Text>
          <Text>{state.token.tokenAddress}</Text>
        </Box>
      ) : (
        <Box>
          <WalletConnect />
        </Box>
      )}
    </div>
  );
};

export default ExternalTokenDetailPageTemplate;
