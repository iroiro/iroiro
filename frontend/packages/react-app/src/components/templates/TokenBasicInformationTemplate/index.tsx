import { Box, Container } from "@material-ui/core";
import React, { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTokenContext } from "../../context/token";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFanPage";
import BasicTokenInformation from "../../organisms/BasicTokenInformation";
import TokenInformationBar from "../../organisms/TokenInformationBar";

export interface TokenBasicInformationProps {
  tokenAddress: string;
}

export const TokenBasicInformationTemplate: React.FC<TokenBasicInformationProps> = ({
  tokenAddress,
}) => {
  const [tokenState, _] = useTokenContext();
  const history = useHistory();
  const [tabNumber, setTabNumber] = useState(0);
  const handleChangeTabs = useCallback(
    (n: number) => {
      setTabNumber(n);
      switch (n) {
        case 1:
          history.push(`/explore/${tokenAddress}/campaigns/`);
          break;
        case 4:
          history.push(`/explore/${tokenAddress}/history`);
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
          <BasicTokenInformation token={tokenState.token} />
        </Box>
      </Container>
    </div>
  );
};
