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
import TokenRequestCard from "../../molecules/TokenRequestCard";
import AudiusTokenClaimCard from "../../molecules/AudiusTokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Typography, Box } from "@material-ui/core";
import { Dispatch } from "react";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import SigninAudius from "../../molecules/SigninAudius";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";

export interface AudiusCampaignDetailPanelProps {
  readonly state: TokenInformationState;
  readonly dispatch: Dispatch<TokenInformationAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
}

// TODO: Add waiting transactions
const AudiusCampaignDetailPanel: React.FC<AudiusCampaignDetailPanelProps> = ({
  state,
  dispatch,
  audiusState,
  audiusDispatch,
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
        {!audiusState.user ? (
          <SigninAudius
            audiusState={audiusState}
            audiusDispatch={audiusDispatch}
          />
        ) : (
          <>
            <TokenRequestCard
              state={state}
              dispatch={dispatch}
              audiusState={audiusState}
            />
            {state.isTokenCheckFinished && (
              <AudiusTokenClaimCard
                campaignAddress={state?.campaignAddress ?? ""}
                symbol={state.token.symbol}
                decimals={state.token.decimals}
                claimAmount={campaign.claimAmount}
                isClaimable={state.isCampaignClaimable}
                isClaimed={state.isCampaignClaimed}
                userAddress={state.userAddress ?? ""}
                dispatch={dispatch}
                audiusState={audiusState}
                distributorType={state.distributorType}
              />
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default AudiusCampaignDetailPanel;
