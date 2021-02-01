import { Box, Container } from "@material-ui/core";
import React, { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../molecules/AppHeader";
import { TabMenuForFanPage } from "../../molecules/TabMenuForFunPage";
import BasicTokenInformation from "../../organisms/BasicTokenInformation";
import TokenInformationBar from "../../organisms/TokenInformationBar";

export interface TokenBasicInformationProps {
  tokenAddress: string;
}

export const TokenBasicInformationTemplate: React.FC<TokenBasicInformationProps> = ({
  tokenAddress,
}) => {
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
      <TokenInformationBar />
      <TabMenuForFanPage value={tabNumber} onChange={handleChangeTabs} />
      <Container maxWidth="md">
        <Box style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
          <BasicTokenInformation />
        </Box>
      </Container>
    </div>
  );
};
