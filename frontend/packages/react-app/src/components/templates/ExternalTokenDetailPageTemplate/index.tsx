import React from "react";
import { Box, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { AccountToken, Campaigns } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import CampaignList from "../../organisms/CampaignList";

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
    <>
      <AppHeader />
      <Box mt={5}>
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
    </>
  );
};

export default ExternalTokenDetailPageTemplate;
