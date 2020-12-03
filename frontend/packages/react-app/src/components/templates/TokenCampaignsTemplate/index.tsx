import * as React from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenCampaigns from "../../organisms/TokenCampaigns";

const TokenCampaignsTemplate = (state: TokenInformationState) => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    {/* TODO Add tab */}
    <TokenCampaigns state={state} />
  </div>
);

export default TokenCampaignsTemplate;
