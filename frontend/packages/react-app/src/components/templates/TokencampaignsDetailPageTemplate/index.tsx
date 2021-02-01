import React, { Dispatch, useCallback, useState } from "react";
import AppHeader from "../../molecules/AppHeader";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import { AudiusState, AUDIUS_ACTIONS } from "../../../reducers/audius";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";
import AudiusCampaignDetailPanel from "../../organisms/AudiusCampaignDetailPanel";
import WalletCampaignDetailPanel from "../../organisms/WalletCampaignDetailPanel";
import { useMemo } from "react";

export interface TokenCampaignsDetailTemplateProps {
  state: CampaignDetailState;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
  tokenAddress: string;
}

export const TokenCampaignsDetailTemplate: React.FC<TokenCampaignsDetailTemplateProps> = ({
  state,
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

  const CampaignDetailPanel = useMemo(() => {
    if (state.distributorType === "audius") {
      return (
        <AudiusCampaignDetailPanel
          state={state}
          dispatch={dispatch}
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
      );
    }
    if (state.distributorType === "wallet") {
      return <WalletCampaignDetailPanel state={state} dispatch={dispatch} />;
    }

    return (
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
    );
  }, [state]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <TokenInformationBar />
      <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
      <Container maxWidth="md">
        <Box style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
          {state.campaign !== null &&
            state.campaign.campaignMetadata &&
            CampaignDetailPanel}
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
