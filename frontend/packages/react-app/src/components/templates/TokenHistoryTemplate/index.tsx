import { Box, Container } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { useTokenContext } from "../../context/token";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFanPage";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import UserHistory from "../../organisms/UserHistory";

export interface TokenHistoryTemplateProps {
  state: TokenHistoryState;
  tokenAddress: string;
}

export const TokenhistoryTemplate: React.FC<TokenHistoryTemplateProps> = ({
  state,
  tokenAddress,
}) => {
  const [tokenState, _] = useTokenContext();
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
      <TokenInformationBar
        token={tokenState.token}
        userAddress={tokenState.userAddress}
        userBalance={tokenState.userBalance}
      />
      <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
      <Container maxWidth="md">
        <Box style={{ padding: 24 }}>
          <UserHistory state={state} />
        </Box>
      </Container>
    </div>
  );
};
