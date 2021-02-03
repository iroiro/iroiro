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
import { TokenInformationState } from "../../../interfaces";
import WalletTokenClaimCard from "../../molecules/WalletTokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Typography, Box } from "@material-ui/core";
import { Dispatch } from "react";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface WalletCampaignDetailPanelProps {
  readonly state: TokenInformationState;
  readonly dispatch: Dispatch<TokenInformationAction>;
}

// TODO: Add waiting transactions
const WalletCampaignDetailPanel: React.FC<WalletCampaignDetailPanelProps> = ({
  state,
  dispatch,
}) => {
  const campaign = state.campaigns.find(
    (campaign) => campaign.id === state.campaignAddress
  );
  if (!state.token || !campaign) {
    return (
      <div>
        <Typography>Campaign not found.</Typography>
      </div>
    );
  }

  const startDate = Number.parseInt(campaign.startDate);
  const endDate = Number.parseInt(campaign.endDate);
  const now = state.now.getTime() / 1000;
  if (now < startDate || endDate <= now) {
    return (
      <div style={{ marginTop: "24px" }}>
        <TokenCampaignDetail campaign={campaign} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <TokenCampaignDetail campaign={campaign} />
      <Box mt={2}>
        <WalletTokenClaimCard
          campaignAddress={state?.campaignAddress ?? ""}
          symbol={state.token.symbol}
          decimals={state.token.decimals}
          claimAmount={campaign.claimAmount}
          isClaimable={state.isCampaignClaimable}
          isClaimed={state.isCampaignClaimed}
          dispatch={dispatch}
          merkleTreeCid={campaign.merkleTreeCid}
        />
      </Box>
    </div>
  );
};

export default WalletCampaignDetailPanel;
