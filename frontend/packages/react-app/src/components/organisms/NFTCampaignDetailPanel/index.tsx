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
import { Box } from "@material-ui/core";
import { Dispatch } from "react";
import {
  CampaignDetailState,
  CampaignDetailAction,
} from "../../../reducers/campaignDetail";
import WalletConnect from "../WalletConnect";
import WalletNFTClaimCard from "../../molecules/NFTClaimCard";
import NFTCampaignDetail from "../NFTCampaignDetail";

export interface NFTCampaignDetailPanelProps {
  readonly active: boolean;
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
}

// TODO: Add waiting transactions
const NFTCampaignDetailPanel: React.FC<NFTCampaignDetailPanelProps> = ({
  active,
  state,
  dispatch,
}) => {
  if (state.campaign === null) {
    return null;
  }

  // TODO get claim amount from proof json
  const child = active ? (
    <WalletNFTClaimCard
      campaignId={state?.campaignId ?? ""}
      isClaimable={state.isCampaignClaimable}
      isClaimed={state.isCampaignClaimed}
      dispatch={dispatch}
      merkleTreeCid={state.campaign.merkleTreeCid}
      distributorAddress={state.distributorAddress}
      distributorType={state.distributorType}
      state={state}
    />
  ) : (
    <WalletConnect />
  );

  console.debug(state);
  console.debug(state.campaign.claims.length);
  console.debug(state.campaign.claims.length !== 0);

  return (
    <div>
      <NFTCampaignDetail campaign={state.campaign} />
      {state.campaign.claims.length === 0 && (
        <Box mt={2} pb={2} style={{ borderTop: "2px solid #f8f8f8" }}>
          {child}
        </Box>
      )}
    </div>
  );
};

export default NFTCampaignDetailPanel;
