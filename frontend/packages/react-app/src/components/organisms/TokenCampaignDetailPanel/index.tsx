import * as React from "react";
import TokenRequestCard from "../../molecules/TokenRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Box } from "@material-ui/core";
import { Dispatch } from "react";
import SigninAudius from "../../molecules/SigninAudius";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { TokenState } from "../../../reducers/tokenContext";

export interface TokenDetailCampaignPanelProps {
  readonly state: CampaignDetailState;
  readonly tokenState: TokenState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
}

// TODO: Add waiting transactions
const TokenDetailCampaignPanel: React.FC<TokenDetailCampaignPanelProps> = ({
  state,
  tokenState,
  dispatch,
  audiusState,
  audiusDispatch,
}) => {
  if (state.campaign === null) {
    return null;
  }

  const campaign = state.campaign;
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
              campaignAddress={state.campaignAddress}
              dispatch={dispatch}
              audiusState={audiusState}
            />
            {state.isTokenCheckFinished && (
              <TokenClaimCard
                campaignAddress={state?.campaignAddress ?? ""}
                symbol={tokenState.token?.symbol}
                decimals={tokenState.token?.decimals}
                claimAmount={campaign.claimAmount}
                isClaimable={state.isCampaignClaimable}
                isClaimed={state.isCampaignClaimed}
                userAddress={tokenState.userAddress ?? ""}
                dispatch={dispatch}
                audiusState={audiusState}
              />
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default TokenDetailCampaignPanel;
