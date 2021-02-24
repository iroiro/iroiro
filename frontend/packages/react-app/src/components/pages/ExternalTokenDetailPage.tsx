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

import React, { useEffect, useCallback, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import {
  campaignsInitialState,
  campaignsReducer,
} from "../../reducers/campaigns";
import { GET_CAMPAIGNS_BY_CREATOR_AND_TOKEN } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { useWeb3React } from "@web3-react/core";

const ExternalTokenDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const { active, account } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;
  const [tokenState, tokenDispatch] = useReducer(
    tokenReducer,
    tokenInitialState
  );
  const [campaignsState, campaignDispatch] = useReducer(
    campaignsReducer,
    campaignsInitialState
  );
  const [getCampaignsByCreatorAndToken, { data }] = useLazyQuery(
    GET_CAMPAIGNS_BY_CREATOR_AND_TOKEN
  );

  const getLocalToken = useCallback(() => {
    tokenDispatch({
      type: "token:getLocal",
      payload: { tokenAddress: tokenAddress },
    });
  }, [tokenAddress]);

  const getCampaignMetadata = useCallback(async (campaigns) => {
    for (let i = 0; i < campaigns.length; i++) {
      const cid = campaigns[i].campaignInfoCid;
      const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
      const response = await fetch(url);
      campaigns[i].campaignMetadata = await response.json();
    }
    campaignDispatch({
      type: "campaignMetadata:set",
      payload: { data: campaigns },
    });
  }, []);

  useEffect(() => {
    getLocalToken();
  }, [getLocalToken]);

  useEffect(() => {
    if (tokenAddress !== "" && account !== undefined && account !== null) {
      getCampaignsByCreatorAndToken({
        variables: {
          creator: account.toLowerCase(),
          token: tokenAddress.toLowerCase(),
        },
      });
    }
  }, [account, tokenAddress, getCampaignsByCreatorAndToken]);

  useEffect(() => {
    if (data !== undefined) {
      campaignDispatch({
        type: "campaign:get",
        payload: { data: data.campaigns },
      });
    }
  }, [tokenAddress, data]);

  useEffect(() => {
    if (campaignsState.campaigns.length > 0) {
      if (campaignsState.campaigns[0].campaignMetadata) {
        return;
      }
      getCampaignMetadata(campaignsState.campaigns);
    }
  }, [campaignsState, getCampaignMetadata]);

  return (
    <>
      {/* <ExternalTokenDetailPageTemplate
        active={active}
        tokenState={tokenState}
        campaignsState={campaignsState}
      /> */}
    </>
  );
};

export default ExternalTokenDetailPage;
