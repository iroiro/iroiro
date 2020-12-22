import React, { Dispatch } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationTabs from "../../organisms/TokenInformationTabs";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import { useWeb3React } from "@web3-react/core";
import WalletConnect from "../../organisms/WalletConnect";

export interface TokenInformationTemplateProps {
  state: TokenInformationState;
  dispatch: Dispatch<TokenInformationAction>;
}

const TokenInformationTemplate: React.FC<TokenInformationTemplateProps> = ({
  state,
  dispatch,
}) => {
  const { active } = useWeb3React();

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
