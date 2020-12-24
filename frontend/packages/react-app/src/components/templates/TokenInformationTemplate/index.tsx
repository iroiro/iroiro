import React, { Dispatch } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationTabs from "../../organisms/TokenInformationTabs";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import WalletConnect from "../../organisms/WalletConnect";

export interface TokenInformationTemplateProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
  readonly active: boolean;
}

const TokenInformationTemplate: React.FC<TokenInformationTemplateProps> = ({
  state,
  dispatch,
  active,
}) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      {!active ? (
        <WalletConnect />
      ) : (
        <TokenInformationTabs state={state} dispatch={dispatch} />
      )}
    </div>
  );
};
export default TokenInformationTemplate;
