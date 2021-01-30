import React, { Dispatch } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationTabs from "../../organisms/TokenInformationTabs";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import WalletConnect from "../../organisms/WalletConnect";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";
import { AppFooter } from "../../molecules/AppFooter";

export interface TokenInformationTemplateProps {
  readonly state: TokenInformationState;
  readonly dispatch: Dispatch<TokenInformationAction>;
  readonly active: boolean;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
}

const TokenInformationTemplate: React.FC<TokenInformationTemplateProps> = ({
  state,
  dispatch,
  active,
  audiusState,
  audiusDispatch,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <AppHeader />
      {!active ? (
        <WalletConnect />
      ) : (
        <TokenInformationTabs
          state={state}
          dispatch={dispatch}
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
      )}
      <AppFooter />
    </div>
  );
};
export default TokenInformationTemplate;
