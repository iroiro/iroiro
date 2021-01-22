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
