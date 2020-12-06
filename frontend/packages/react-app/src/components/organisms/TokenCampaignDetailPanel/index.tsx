import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";

export interface TokenDetailCampaignPanelProps {
  readonly state: TokenInformationState;
  readonly campaignAddress: string;
  readonly isApproved: boolean;
  readonly isRequested: boolean;
  readonly isClaimable: boolean;
  readonly isClaimed: boolean;
}

const TokenDetailCampaignPanel = ({
  state,
  campaignAddress,
}: TokenDetailCampaignPanelProps) => {
  return (
    <>
      <TokenCampaignDetail state={state} campaignAddress={campaignAddress} />
      <TokenRequestCard
        isApproved={state.isTokenApproved}
        isRequested={state.isTokenRequested}
      />
      <TokenClaimCard
        isClaimable={state.isCampaignClaimable}
        isClaimed={state.isCampaignClaimed}
      />
    </>
  );
};

export default TokenDetailCampaignPanel;
