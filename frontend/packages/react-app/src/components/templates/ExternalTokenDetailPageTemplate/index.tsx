import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenAndCampaignProps } from "../../../interfaces";
import WalletConnect from "../../organisms/WalletConnect";
import Container from "../../atoms/Container";
import CampaignList from "../../organisms/CampaignList";

const ExternalTokenDetailPageTemplate = ({
  tokenState,
  campaignsState,
}: TokenAndCampaignProps) => {
  const { active } = useWeb3React();
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
