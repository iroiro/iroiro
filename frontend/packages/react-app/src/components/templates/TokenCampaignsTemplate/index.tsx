import React, { useState, Dispatch } from "react";
import { TokenInformationState } from "../../../interfaces";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFanPage";
import TokenCampaigns from "../../organisms/TokenCampaigns";
import Container from "@material-ui/core/Container";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import Box from "@material-ui/core/Box";
import TokenInformationBar from "../../organisms/TokenInformationBar";

export interface TokenCampaignsTemplateProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
  dispatch,
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
          <TokenCampaigns campaigns={state.campaigns} dispatch={dispatch} />
        </Box>
      </Container>
    </div>
  );
};
