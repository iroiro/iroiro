import React, { Dispatch } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationTabs from "../../organisms/TokenInformationTabs";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenInformationTemplateProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
}

const TokenInformationTemplate: React.FC<TokenInformationTemplateProps> = ({
  state,
  dispatch,
}) => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    <TokenInformationTabs state={state} dispatch={dispatch} />
  </div>
);

export default TokenInformationTemplate;
