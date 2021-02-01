import React, { useCallback, useState } from "react";
import AppHeader from "../../molecules/AppHeader";
import TokenCampaigns from "../../organisms/TokenCampaigns";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import { useHistory } from "react-router-dom";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";
import { TokenCampaignsState } from "../../../reducers/tokenCampaigns";

export interface TokenCampaignsTemplateProps {
  state: TokenCampaignsState;
  tokenAddress: string;
}

export const TokenCampaignsTemplate: React.FC<TokenCampaignsTemplateProps> = ({
  state,
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
      <TokenInformationBar />
      <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
      <Container maxWidth="md">
        <Box style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
          <TokenCampaigns
            campaigns={state.campaigns}
            tokenAddress={tokenAddress}
          />
        </Box>
      </Container>
    </div>
  );
};
