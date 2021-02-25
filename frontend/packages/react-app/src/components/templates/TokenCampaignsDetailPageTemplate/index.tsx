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
import Typography from "@material-ui/core/Typography";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { TabMenuForFunPage } from "../../molecules/TabMenuForFunPage";
import WalletCampaignDetailPanel from "../../organisms/WalletCampaignDetailPanel";
import { useMemo } from "react";
import TokenInfoBar from "../../molecules/TokenInfoBar";
import AppFrame from "../../organisms/AppFrame";

export interface TokenCampaignsDetailTemplateProps {
  readonly active: boolean;
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  tokenAddress: string;
}

export const TokenCampaignsDetailTemplate: React.FC<TokenCampaignsDetailTemplateProps> = ({
  active,
  state,
  dispatch,
  tokenAddress,
}) => {
  const CampaignDetailPanel = useMemo(() => {
    switch (state.distributorType) {
      case "wallet":
      case "uuid":
        return (
          <WalletCampaignDetailPanel
            active={active}
            state={state}
            dispatch={dispatch}
          />
        );
    }

    return (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          lineHeight: "240px",
          height: 240,
        }}
      >
        <Typography>Campaign not found.</Typography>
      </div>
    );
  }, [state]);

  return (
    <>
      <AppFrame>
        <TokenInfoBar />
        <TabMenuForFunPage current={"campaigns"} tokenAddress={tokenAddress} />
        <div style={{ backgroundColor: "#fff" }}>
          {state.campaign !== null &&
            state.campaign.campaignMetadata &&
            CampaignDetailPanel}
          {state.campaign === null && (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                lineHeight: "240px",
                height: 240,
              }}
            >
              <Typography>Campaign not found.</Typography>
            </div>
          )}
        </div>
      </AppFrame>
    </>
  );
};
