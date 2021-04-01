/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import { CampaignInfo } from "../../../interfaces";
import { Typography, Box, Link, Grid } from "@material-ui/core";
import theme from "../../../theme/mui-theme";
import { useEffect, useState } from "react";
import distributors, { getDistributorType } from "../../../utils/distributors";
import styled from "styled-components";
import NFTTokenCampaignCard from "../../molecules/NFTCampaignCard";
import { getImageURLFromIPFSHash } from "../NFTCampaigns";
import Item from "../../molecules/Item";
import EtherscanLink from "../../atoms/EtherscanLink";
import MarketplaceLink from "../../atoms/MarketplaceLink";

export interface NFTCampaignDetailProps {
  readonly campaign: CampaignInfo;
}

const NFTCampaignDetail: React.FC<NFTCampaignDetailProps> = ({ campaign }) => {
  const [distributorType, setDistributorType] = useState("");

  const chainId = process.env?.REACT_APP_CHAIN_ID ?? "1";
  const showMarketplace =
    campaign.claimedNum !== "0" && (chainId === "1" || chainId === "4");

  useEffect(() => {
    const distributor = distributors.find(
      (distributor) =>
        distributor.id.toLowerCase() === campaign.distributor.id.toLowerCase()
    );
    setDistributorType(getDistributorType(distributor?.type ?? ""));
  }, [campaign]);

  return (
    <Wrapper>
      <Grid container justify="center">
        <Grid xs={12} sm={4} item>
          <NFTTokenCampaignCard
            name={campaign.campaignMetadata.name}
            description={campaign.campaignMetadata.description}
            image={getImageURLFromIPFSHash(campaign.campaignMetadata.image)}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="start" alignItems="baseline" mt={2}>
        <Typography variant="caption" style={{ color: "#797979" }}>
          Token ID:
        </Typography>
        <Typography variant="body1" style={{ paddingLeft: 8 }}>
          {campaign.id !== "" ? campaign.id.split("-")[1] : ""}
        </Typography>
      </Box>
      <Box
        display="flex"
        mt={4}
        style={{ alignItems: "center", justifyContent: "left" }}
      >
        <Typography variant="caption" style={{ color: "#797979" }}>
          NFT Contract Address:
        </Typography>
        <Box
          component="div"
          textOverflow="ellipsis"
          overflow="hidden"
          style={{ paddingLeft: 8 }}
        >
          {campaign.distributor.id}
        </Box>
      </Box>
      <Box
        display="flex"
        style={{ alignItems: "center", justifyContent: "left" }}
      >
        <EtherscanLink
          type="contract"
          addressOrTxHash={campaign.distributor.id}
          small={true}
        />
      </Box>
      {showMarketplace && (
        <>
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
            overflow="hidden"
          >
            <Item title="Check in Marketplaces" text="" />
          </Box>
          <Box
            display="flex"
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            <MarketplaceLink
              chainId={chainId}
              market="opensea"
              address={campaign.distributor.id}
              campaignId={campaign.id}
              small={true}
            />
          </Box>
          <Box
            display="flex"
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            <MarketplaceLink
              chainId={chainId}
              market="rarible"
              address={campaign.distributor.id}
              campaignId={campaign.id}
              small={true}
            />
          </Box>
        </>
      )}
      <Box display="flex" justifyContent="start" alignItems="baseline" mt={2}>
        <Typography variant="caption" style={{ color: "#797979" }}>
          Distributor Type:
        </Typography>
        <Typography variant="body1" style={{ paddingLeft: 8 }}>
          {distributorType}
        </Typography>
      </Box>
      <Box>
        <Link
          href="https://medium.com/iroiro-social-token/introducing-how-to-distribute-token-by-wallet-address-or-url-4e4646581047"
          rel="noreferrer"
          target="_blank"
          color="primary"
          variant="caption"
          style={{ textDecoration: "underline" }}
        >
          What’s distributor type?
        </Link>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px;
  ${theme.breakpoints.down(760)} {
    padding: 24px;
  }
`;

export default NFTCampaignDetail;
