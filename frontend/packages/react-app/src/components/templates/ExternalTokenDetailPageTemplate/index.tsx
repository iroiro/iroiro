import React from "react";
import { Box, Text } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenInfo } from "../../../reducers/token";

interface ExternalTokenDetailPageTemplateProps {
  readonly state: TokenInfo;
}

const ExternalTokenDetailPageTemplate = ({
  state,
}: ExternalTokenDetailPageTemplateProps) => (
  <div>
    <AppHeader />
    <Box m={"auto"} my={5} width={[4 / 5, 3 / 4]}>
      <Text>{state.token.name}</Text>
      <Text>{state.token.tokenAddress}</Text>
    </Box>
  </div>
);

export default ExternalTokenDetailPageTemplate;
