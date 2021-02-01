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

export interface WalletCampaignDetailPanelProps {
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
}

// TODO: Add waiting transactions
const WalletCampaignDetailPanel: React.FC<WalletCampaignDetailPanelProps> = ({
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
      <div style={{ marginTop: "24px" }}>
        <TokenCampaignDetail campaign={state.campaign} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "24px" }}>
      <TokenCampaignDetail campaign={state.campaign} />
      <Box mt={2}>
        <WalletTokenClaimCard
          campaignAddress={state?.campaignAddress ?? ""}
          symbol={tokenState.token?.symbol ?? ""}
          decimals={tokenState.token?.decimals ?? 0}
          claimAmount={state.campaign.claimAmount}
          isClaimable={state.isCampaignClaimable}
          isClaimed={state.isCampaignClaimed}
          dispatch={dispatch}
          merkleTreeCid={state.campaign.merkleTreeCid}
        />
      </Box>
    </div>
  );
};

export default WalletCampaignDetailPanel;
