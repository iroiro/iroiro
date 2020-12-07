import React from "react";
import { Heading, Card, Flex } from "rimble-ui";
import { TokenAndCampaignProps } from "../../../interfaces";
import LinkButton from "../../atoms/LinkButton";
import CampaignListTable from "../../molecules/CampaignListTable";

const CampaignList: React.FC<TokenAndCampaignProps> = ({
  tokenState,
  campaignsState,
}) => {
  return (
    <>
      <Flex style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Heading as={"h1"}>{tokenState.token.name}</Heading>
        <LinkButton
          m={0}
          path={`/dashboard/${tokenState.token.tokenAddress}/distributors`}
          text="+ Create New Campaign"
          mainColor="itblue"
        ></LinkButton>
      </Flex>
      <Card>
        <Heading as={"h2"}>Audius Distributor</Heading>
        <CampaignListTable
          tokenState={tokenState}
          campaignsState={campaignsState}
        />
      </Card>
    </>
  );
};

export default CampaignList;
