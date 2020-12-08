import React from "react";
import { Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { CampaignInfo, AccountToken } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import Container from "../../atoms/Container";
import CampaignList from "../../organisms/CampaignList";

export interface ExternalTokenDetailPageTemplateProps {
  readonly active: boolean;
  readonly tokenState: AccountToken;
  readonly campaignsState: CampaignInfo[];
}

const ExternalTokenDetailPageTemplate: React.FC<ExternalTokenDetailPageTemplateProps> = ({
  active,
  tokenState,
  campaignsState,
}) => {
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
