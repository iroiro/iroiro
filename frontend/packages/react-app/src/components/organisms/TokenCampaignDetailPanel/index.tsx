import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Typography } from "@material-ui/core";
import { Dispatch } from "react";
import { TokenInformationAction } from "../../../reducers/tokenInformation";

export interface TokenDetailCampaignPanelProps {
  readonly state: TokenInformationState;
  readonly dispatch: Dispatch<TokenInformationAction>;
}

// TODO: Add waiting transactions
const TokenDetailCampaignPanel: React.FC<TokenDetailCampaignPanelProps> = ({
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

  return (
    <>
      <TokenCampaignDetail campaign={campaign} />
      <TokenRequestCard state={state} dispatch={dispatch} />
      {state.isTokenCheckFinished && (
        <TokenClaimCard
          campaignAddress={state?.campaignAddress ?? ""}
          symbol={state.token.symbol}
          claimAmount={campaign.claimAmount}
          isClaimable={state.isCampaignClaimable}
          isClaimed={state.isCampaignClaimed}
        />
      )}
    </>
  );
};

export default TokenDetailCampaignPanel;
