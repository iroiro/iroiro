import React, { Dispatch, useCallback, useState } from "react";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFanPage";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import TokenDetailCampaignPanel from "../../organisms/TokenCampaignDetailPanel";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { useHistory } from "react-router-dom";
import { TokenState } from "../../../reducers/tokenContext";
import { Paper } from "@material-ui/core";

export interface TokenCampaignsDetailTemplateProps {
  state: CampaignDetailState;
  tokenState: TokenState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
  tokenAddress: string;
}

export const TokenCampaignsDetailTemplate: React.FC<TokenCampaignsDetailTemplateProps> = ({
  state,
  tokenState,
  dispatch,
  audiusState,
  audiusDispatch,
  tokenAddress,
}) => {
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(1);

  const handleChangeTabs = useCallback(
    (n: number) => {
      setTabNumber(n);
      switch (n) {
        case 0:
          history.push(`/explore/${tokenAddress}`);
          break;
        case 1:
          history.push(`/explore/${tokenAddress}/campaigns/`);
          break;
        case 4:
          history.push(`/explore/${tokenAddress}/history/`);
          break;
        default:
          break;
      }
    },
    [tabNumber, tokenAddress]
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <TokenInformationBar
        token={tokenState.token}
        userAddress={tokenState.userAddress}
        userBalance={tokenState.userBalance}
      />
      <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
      <Container maxWidth="md">
        <Box style={{ padding: 24 }}>
          {state.campaign !== null && state.campaign.campaignMetadata && (
            <TokenDetailCampaignPanel
              state={state}
              tokenState={tokenState}
              dispatch={dispatch}
              audiusState={audiusState}
              audiusDispatch={audiusDispatch}
            />
          )}
          {state.campaign === null && (
            <Paper
              style={{
                padding: 24,
                margin: "40px 0",
                textAlign: "center",
                lineHeight: "240px",
                height: 240,
              }}
            >
              <Typography>Campaign not found.</Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </div>
  );
};
