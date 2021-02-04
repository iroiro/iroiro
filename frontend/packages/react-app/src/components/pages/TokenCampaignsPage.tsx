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

import React, { useEffect, useReducer } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useWeb3React } from "@web3-react/core";
import { RouteComponentProps } from "react-router-dom";
import { useTokenContext } from "../../context/token";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";
import {
  initialState,
  tokenCampaignsReducer,
} from "../../reducers/tokenCampaigns";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { TokenCampaignsTemplate } from "../templates/TokenCampaignsPageTemplate";

const TokenCampaignsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const { library } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;
  const [state, dispatch] = useReducer(tokenCampaignsReducer, initialState);
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);

  useEffect(() => {
    if (
      tokenState.token === undefined ||
      tokenState.token.tokenAddress !== tokenAddress
    ) {
      const f = async () => {
        const token = await getTokenInfo(library, tokenAddress);
        if (token === undefined) {
          return;
        }
        tokenStateDispatch({ type: "token:set", payload: { token } });
      };
      f();
    }
  }, [library, tokenAddress]);
  useEffect(() => {
    if (
      tokenState.userAddress === "" ||
      tokenState.token?.tokenAddress !== tokenAddress
    ) {
      const f = async () => {
        if (library === undefined) {
          return;
        }
        const address = await library.getSigner().getAddress();
        tokenStateDispatch({
          type: "userAddress:set",
          payload: {
            address,
          },
        });
      };
      f();
    }
  }, [library, tokenStateDispatch]);
  useEffect(() => {
    if (
      tokenState.userBalance === "" ||
      tokenState.token?.tokenAddress !== tokenAddress
    ) {
      if (!library) {
        return;
      }
      const f = async () => {
        const balance = await getWalletBalance(library, tokenAddress);
        if (balance === undefined) {
          return;
        }
        tokenStateDispatch({ type: "userBalance:set", payload: { balance } });
      };
      f();
    }
  }, [library, tokenState.token, tokenStateDispatch]);

  useEffect(() => {
    getCampaigns({
      variables: {
        token: tokenAddress.toLowerCase(),
      },
    });
  }, [tokenAddress, getCampaigns]);
  useEffect(() => {
    const f = async () => {
      if (!tokenAddress) {
        return;
      }
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
  }, [tokenAddress, campaignData]);

  return <TokenCampaignsTemplate state={state} tokenAddress={tokenAddress} />;
};

export default TokenCampaignsPage;
