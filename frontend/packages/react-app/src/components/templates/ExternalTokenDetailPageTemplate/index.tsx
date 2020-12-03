import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Heading, Card, Table, Flex } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenInfo } from "../../../reducers/token";
import { CampaignInfo } from "../../../reducers/campaign";
import WalletConnect from "../../organisms/WalletConnect";
import Container from "../../atoms/Container";

interface ExternalTokenDetailPageTemplateProps {
  readonly tokenState: TokenInfo;
  readonly campaignsState: CampaignInfo[];
}

const ExternalTokenDetailPageTemplate = ({
  tokenState,
  campaignsState,
}: ExternalTokenDetailPageTemplateProps) => {
  const { active } = useWeb3React();
  return (
    <>
      <AppHeader />
      <Container>
        {active ? (
          <Box>
            <Flex
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Heading as={"h1"}>{tokenState.token.name}</Heading>
              <Button>+ Create New Campaign</Button>
            </Flex>
            <Card>
              <Heading as={"h2"}>Audius Distributor</Heading>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Startdate</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignsState.length > 0 &&
                    campaignsState.map((campaign) => (
                      <tr key={campaign.id}>
                        {"campaignMetadata" in campaign && (
                          <td>{campaign.campaignMetadata.name}</td>
                        )}
                        {/* TODO: あとで正確な数字にする */}
                        <td>{campaign.claimAmount}</td>
                        <td>{campaign.startDate}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </Box>
        ) : (
          <Box>
            <WalletConnect />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ExternalTokenDetailPageTemplate;
