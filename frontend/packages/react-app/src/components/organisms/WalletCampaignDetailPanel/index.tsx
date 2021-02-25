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

import * as React from "react";
import WalletTokenClaimCard from "../../molecules/WalletTokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Box } from "@material-ui/core";
import { Dispatch } from "react";
import {
  CampaignDetailState,
  CampaignDetailAction,
} from "../../../reducers/campaignDetail";
import { useTokenContext } from "../../../context/token";
import WalletConnect from "../WalletConnect";

export interface WalletCampaignDetailPanelProps {
  readonly active: boolean;
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
}

// TODO: Add waiting transactions
const WalletCampaignDetailPanel: React.FC<WalletCampaignDetailPanelProps> = ({
  active,
  state,
  dispatch,
}) => {
  const { state: tokenState } = useTokenContext();
  if (state.campaign === null) {
    return null;
  }

  const startDate = Number.parseInt(state.campaign.startDate);
  const endDate = Number.parseInt(state.campaign.endDate);
  const now = state.now.getTime() / 1000;
  if (now < startDate || endDate <= now) {
    return (
      <div>
        <TokenCampaignDetail campaign={state.campaign} />
      </div>
    );
  }

  const child = active ? (
    <WalletTokenClaimCard
      campaignAddress={state?.campaignAddress ?? ""}
      symbol={tokenState.token?.symbol ?? ""}
      decimals={tokenState.token?.decimals ?? 0}
      claimAmount={state.campaign.claimAmount}
      isClaimable={state.isCampaignClaimable}
      isClaimed={state.isCampaignClaimed}
      dispatch={dispatch}
      merkleTreeCid={state.campaign.merkleTreeCid}
      distributorType={state.distributorType}
      hashedUUID={state.hashedUUID}
    />
  ) : (
    <WalletConnect />
  );

  return (
    <div>
      <TokenCampaignDetail campaign={state.campaign} />
      <Box mt={2} pb={2} style={{ borderTop: "2px solid #f8f8f8" }}>
        {child}
      </Box>
    </div>
  );
};

export default WalletCampaignDetailPanel;
