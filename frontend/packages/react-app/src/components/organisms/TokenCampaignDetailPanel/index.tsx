import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Typography } from "@material-ui/core";

export interface TokenDetailCampaignPanelProps {
  readonly state: TokenInformationState;
}

const TokenDetailCampaignPanel = ({
  state: {
    token,
    campaigns,
    campaignAddress,
    isTokenApproved,
    isTokenRequested,
    isTokenCheckFinished,
    isCampaignClaimable,
    isCampaignClaimed,
  },
}: TokenDetailCampaignPanelProps) => {
  const campaign = campaigns.find(
    (campaign) => campaign.id === campaignAddress
  );
  if (!token || !campaign) {
    return (
      <div>
        <Typography>Campaign not found.</Typography>
      </div>
    );
  }

  return (
    <>
      <TokenCampaignDetail campaign={campaign} />
      <TokenRequestCard
        isApproved={isTokenApproved}
        isRequested={isTokenRequested}
      />
      {isTokenCheckFinished && (
        <TokenClaimCard
          symbol={token.symbol}
          claimAmount={campaign.claimAmount}
          isClaimable={isCampaignClaimable}
          isClaimed={isCampaignClaimed}
        />
      )}
    </>
  );
};

export default TokenDetailCampaignPanel;
