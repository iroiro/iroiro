import React from "react";
import { Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenInfo, CampaignInfo } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import Container from "../../atoms/Container";
import CampaignList from "../../organisms/CampaignList";

export interface ExternalTokenDetailPageTemplateProps {
  readonly active: boolean;
  readonly tokenState: TokenInfo;
  readonly campaignsState: CampaignInfo[];
}

const ExternalTokenDetailPageTemplate = ({
  active,
  tokenState,
  campaignsState,
}: ExternalTokenDetailPageTemplateProps) => {
  return (
    <>
      <AppHeader />
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
    </>
  );
};

export default ExternalTokenDetailPageTemplate;
