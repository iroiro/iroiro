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
import { useEffect, useReducer } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router-dom";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";
import {
  initialState,
  tokenCampaignsReducer,
} from "../../reducers/tokenCampaigns";
import { NFTCampaignsTemplate } from "../templates/NFTCampaignsPageTemplate";
import { NFT_DISPLAY_AMOUNT } from "../../utils/const";

const NFTCampaignsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const [state, dispatch] = useReducer(tokenCampaignsReducer, initialState);
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);

  useEffect(() => {
    getCampaigns({
      variables: {
        token: null,
        distributorNot: null,
        first: NFT_DISPLAY_AMOUNT,
      },
    });
  }, [getCampaigns]);

  useEffect(() => {
    const f = async () => {
      if (campaignData === undefined) {
        return;
      }
      const rawCampaigns = campaignData.campaigns;
      const campaigns: CampaignInfo[] = await Promise.all(
        rawCampaigns.map(async (rawCampaign: CampaignInfo) => {
          const cid = rawCampaign.campaignInfoCid;
          const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
          const response = await fetch(url);
          const data = await response.json();
          const campaign: CampaignInfo = Object.assign<
            CampaignInfo,
            { campaignMetadata: CampaignMetadata }
          >(rawCampaign, { campaignMetadata: data });
          return campaign;
        })
      );

      dispatch({
        type: "campaigns:set",
        payload: { campaigns: campaigns },
      });
    };
    f();
  }, [campaignData]);

  return <NFTCampaignsTemplate state={state} />;
};

export default NFTCampaignsPage;
