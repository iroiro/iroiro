/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
