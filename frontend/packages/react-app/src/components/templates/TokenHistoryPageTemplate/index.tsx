import { Box, Container } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { AppFooter } from "../../molecules/AppFooter";
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
    <div style={{ height: "100%", minHeight: "100vh" }}>
      <AppHeader />
      <Box
        m={"auto"}
        minWidth={320}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 190px)",
          minHeight: "600px",
        }}
      >
        <TokenInformationBar />
        <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
        <Container maxWidth="md">
          <Box
            style={{
              padding: 24,
              maxWidth: 860,
              margin: "0 auto",
              minWidth: 320,
            }}
          >
            <UserHistory state={state} />
          </Box>
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};
