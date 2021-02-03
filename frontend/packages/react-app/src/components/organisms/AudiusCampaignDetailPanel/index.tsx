import * as React from "react";
import TokenRequestCard from "../../molecules/TokenRequestCard";
import AudiusTokenClaimCard from "../../molecules/AudiusTokenClaimCard";
import TokenCampaignDetail from "../TokenCampaignDetail";
import { Box } from "@material-ui/core";
import { Dispatch } from "react";
import SigninAudius from "../../molecules/SigninAudius";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { useTokenContext } from "../../../context/token";

export interface AudiusCampaignDetailPanelProps {
  readonly state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
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
                symbol={tokenState.token?.symbol ?? ""}
                decimals={tokenState.token?.decimals ?? 0}
                claimAmount={state.campaign.claimAmount}
                isClaimable={state.isCampaignClaimable}
                isClaimed={state.isCampaignClaimed}
                userAddress={tokenState.userAddress ?? ""}
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
