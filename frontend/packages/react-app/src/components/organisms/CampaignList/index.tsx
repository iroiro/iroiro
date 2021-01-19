import React from "react";
import { Box, Typography, Card } from "@material-ui/core";
import { TokenAndCampaignProps } from "../../../interfaces";
import LinkButton from "../../atoms/LinkButton";
import CampaignListTable from "../../molecules/CampaignListTable";
import { TitleBox } from "./style";

const CampaignList: React.FC<TokenAndCampaignProps> = ({
  tokenState,
  campaignsState,
}) => {
  return (
    <>
      <TitleBox
        style={{ alignItems: "center", justifyContent: "space-between" }}
        my={1}
      >
        <Typography variant={"h3"}>{tokenState.token?.name}</Typography>
        <LinkButton
          m={0}
          path={`/dashboard/${tokenState.token?.tokenAddress}/distributors`}
          text="+ Create New Campaign"
          color="secondary"
        ></LinkButton>
      </TitleBox>
      <Card>
        <Box m={2}>
          <Typography variant={"h4"}>Audius Distributor</Typography>
        </Box>

        <CampaignListTable
          tokenState={tokenState}
          campaignsState={campaignsState}
        />
      </Card>
    </>
  );
};

export default CampaignList;
