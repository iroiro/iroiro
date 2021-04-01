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

import React from "react";
import { Box, Grid } from "@material-ui/core";
import { CampaignData } from "../../../reducers/campaign";
import Item from "../../molecules/Item";
import NFTCampaignCard from "../../molecules/NFTCampaignCard";
import { getImageURLFromIPFSHash } from "../NFTCampaigns";
import { DistributorTypes } from "../../../interfaces";
import EtherscanLink from "../../atoms/EtherscanLink";
import MarketplaceLink from "../../atoms/MarketplaceLink";

export interface CampaignDetailForCreatorProps {
  readonly campaignData: CampaignData;
  readonly distributorType: DistributorTypes | string;
}

const CampaignDetailForCreator: React.FC<CampaignDetailForCreatorProps> = ({
  campaignData,
  distributorType,
}) => {
  // TODO extract network as context
  const chainId = process.env?.REACT_APP_CHAIN_ID ?? "1";
  const showMarketplace =
    campaignData.campaign.claimedNum !== "0" &&
    (distributorType === "wallet-nft" || distributorType === "uuid-nft") &&
    (chainId === "1" || chainId === "4");

  return (
    <>
      {(distributorType === "wallet-nft" || distributorType === "uuid-nft") &&
        campaignData.campaign.campaignMetadata !== undefined && (
          <Grid container justify="center">
            <Grid xs={12} sm={4} item>
              <NFTCampaignCard
                name={campaignData.campaign.campaignMetadata.name}
                description={campaignData.campaign.campaignMetadata.description}
                image={getImageURLFromIPFSHash(
                  campaignData.campaign.campaignMetadata.image
                )}
              />
            </Grid>
          </Grid>
        )}
      {
        <Box>
          {(distributorType === "wallet" || distributorType === "uuid") && (
            <>
              <Box
                display="flex"
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {"campaignMetadata" in campaignData.campaign && (
                  <Item
                    title="Campaign Name"
                    text={campaignData.campaign.campaignMetadata.name}
                  />
                )}
              </Box>
              <Box
                display="flex"
                mt={4}
                style={{ alignItems: "center", justifyContent: "left" }}
              >
                {"campaignMetadata" in campaignData.campaign && (
                  <Item
                    title="Campaign Description"
                    text={campaignData.campaign.campaignMetadata.description}
                  />
                )}
              </Box>
            </>
          )}
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            {(distributorType === "wallet" || distributorType === "uuid") && (
              <Item
                title="Campaign tokens balance"
                text={campaignData.depositTokens}
              />
            )}
            {(distributorType === "wallet-nft" ||
              distributorType === "uuid-nft") && (
              <Item
                title="Token ID"
                text={campaignData.campaign.id.split("-")[1]}
              />
            )}
            <Item
              title="Claimed Number"
              text={String(campaignData.campaign.claimedNum)}
            />
          </Box>
          <Box
            display="flex"
            mt={4}
            style={{ alignItems: "center", justifyContent: "left" }}
            overflow="hidden"
          >
            <Item
              title="Contract Address"
              text={campaignData.campaign.distributor.id}
            />
          </Box>
          <Box
            display="flex"
            style={{ alignItems: "center", justifyContent: "left" }}
          >
            <EtherscanLink
              type="contract"
              addressOrTxHash={campaignData.campaign.distributor.id}
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
                  address={campaignData.campaign.distributor.id}
                  campaignId={campaignData.campaign.id}
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
                  address={campaignData.campaign.distributor.id}
                  campaignId={campaignData.campaign.id}
                  small={true}
                />
              </Box>
            </>
          )}
        </Box>
      }
    </>
  );
};

export default CampaignDetailForCreator;
