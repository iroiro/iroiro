import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Typography } from "@material-ui/core";

export interface TokenDetailCampaignPanelProps {
  readonly state: TokenInformationState;
}

// TODO: Add waiting transactions
const TokenDetailCampaignPanel: React.FC<TokenDetailCampaignPanelProps> = ({
  state,
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
      <TokenRequestCard state={state} />
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
