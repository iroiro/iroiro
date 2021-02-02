import React from "react";
import { Box, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { AccountToken, Campaigns } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import CampaignList from "../../organisms/CampaignList";
import { AppFooter } from "../../molecules/AppFooter";

export interface ExternalTokenDetailPageTemplateProps {
  readonly active: boolean;
  readonly tokenState: AccountToken;
  readonly campaignsState: Campaigns;
}

const ExternalTokenDetailPageTemplate: React.FC<ExternalTokenDetailPageTemplateProps> = ({
  active,
  tokenState,
  campaignsState,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <AppHeader />
      <Box
        mt={5}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 266px)",
          minHeight: "300px",
        }}
      >
        <Container>
          {!active ? (
            <Box>
              <WalletConnect />
            </Box>
          ) : (
            <Box>
              <CampaignList
                tokenState={tokenState}
                campaignsState={campaignsState}
              />
            </Box>
          )}
        </Container>
      </Box>
      <AppFooter />
    </div>
  );
};

export default ExternalTokenDetailPageTemplate;
