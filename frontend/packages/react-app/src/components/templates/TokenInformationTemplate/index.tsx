import React from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationTabs from "../../organisms/TokenInformationTabs";

export interface TokenInformationTemplateProps {
  state: TokenInformationState;
}

const TokenInformationTemplate: React.FC<TokenInformationTemplateProps> = ({
  state,
}) => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    <TokenInformationTabs state={state} />
  </div>
);

export default TokenInformationTemplate;
