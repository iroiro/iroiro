import * as React from "react";
import AppHeader from "../../molecules/AppHeader";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import { TokenInformationState } from "../../../interfaces";
import TokenCampaignDetail from "../../organisms/TokenCampaignDetail";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";

export interface TokenCampaignDetailTemplateProps {
  readonly state: TokenInformationState;
  readonly campaignAddress: string;
}

const TokenCampaignDetailTemplate = ({
  state,
  campaignAddress,
}: TokenCampaignDetailTemplateProps) => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    {/* TODO Add tab */}
    <TokenInformationBar state={state} />
    <TokenCampaignDetail state={state} campaignAddress={campaignAddress} />
    <TokenRequestCard />
    <TokenClaimCard />
  </div>
);

export default TokenCampaignDetailTemplate;
