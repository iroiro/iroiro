import React, { useState } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFanPage";
import TokenCampaigns from "../../organisms/TokenCampaigns";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";

export interface TokenCampaignsTemplateProps {
  state: TokenCampaignsState;
  tokenAddress: string;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  const [tabNumber, setTubNumber] = useState(1);
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <TokenInformationBar
        token={state.token}
        userAddress={state.userAddress}
        userBalance={state.userBalance}
      />
      <TabMenuForFanPage value={tabNumber} onChange={(n) => setTubNumber(n)} />
      <Container>
        <Box style={{ padding: 24 }}>
          <TokenCampaigns
            campaigns={state.campaigns}
            tokenAddress={tokenAddress}
          />
        </Box>
      </Container>
    </div>
  );
};
