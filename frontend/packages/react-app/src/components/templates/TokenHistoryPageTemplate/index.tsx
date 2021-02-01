import { Box, Container } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTokenContext } from "../../../context/token";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";

import TokenInformationBar from "../../organisms/TokenInformationBar";
import UserHistory from "../../organisms/UserHistory";

export interface TokenHistoryTemplateProps {
  state: TokenHistoryState;
  tokenAddress: string;
}

export const TokenHistoryTemplate: React.FC<TokenHistoryTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(4);
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
          <UserHistory state={state} />
        </Box>
      </Container>
    </div>
  );
};
