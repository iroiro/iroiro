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
import {
  GET_CAMPAIGN,
  GET_CHECK_REQUEST,
  GET_CLAIM,
} from "../../graphql/subgraph";
import { useIsClaimable } from "../../hooks/distributors/useIsClaimable";
import { useGetAllowance } from "../../hooks/useGetAllowance";
import { CampaignInfo, CampaignMetadata, Claim } from "../../interfaces";
import {
  campaignDetailReducer,
  initialState,
} from "../../reducers/campaignDetail";
import { LINK_TOKEN_ADDRESS } from "../../utils/const";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { TokenCampaignsDetailTemplate } from "../templates/TokenCampaignsDetailPageTemplate";
import distributors from "../../utils/distributors";
import { ethers } from "ethers";

const TokenCampaignDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    campaignAddress: string;
    distributorAddress: string;
  }>
> = (props) => {
  const [state, dispatch] = useReducer(campaignDetailReducer, initialState);
  const [getCampaign, { data: campaignData }] = useLazyQuery(GET_CAMPAIGN);
  const { active, library } = useWeb3React();
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();
  const tokenAddress = props.match.params.tokenAddress;
  const campaignAddress = props.match.params.campaignAddress;
  const distributorAddress = props.match.params.distributorAddress;

  const uuid: string =
    new URLSearchParams(props.location.search)?.get("uuid") ?? "";
  const hashedUUID: string = ethers.utils.solidityKeccak256(["string"], [uuid]);

  const { isClaimable } = useIsClaimable(
    library,
    state?.campaignAddress ?? "",
    state?.distributorType,
    hashedUUID
  );
  const { allowance } = useGetAllowance(
    library,
    LINK_TOKEN_ADDRESS,
    state?.campaignAddress ?? ""
  );
  const [getClaim, { data: getClaimData }] = useLazyQuery<{ claim: Claim }>(
    GET_CLAIM
  );

  useEffect(() => {
    dispatch({ type: "hashedUUID:set", payload: { hashedUUID } });
  }, [hashedUUID]);

  useEffect(() => {
    dispatch({ type: "campaignAddress:set", payload: { campaignAddress } });
  }, [campaignAddress]);

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
    getCampaign({
      variables: {
        id: campaignAddress.toLowerCase(),
      },
    });
  }, [campaignAddress, getCampaign]);

  useEffect(() => {
    const f = async () => {
      if (!tokenAddress) {
        return;
      }
      if (
        campaignData === undefined ||
        campaignData?.campaign?.campaignInfoCid === undefined
      ) {
        return;
      }
      const fetchCampaignMetaData: () => Promise<CampaignInfo> = async () => {
        const cid = campaignData.campaign.campaignInfoCid;
        const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
        const response = await fetch(url);
        const data = await response.json();
        const campaign: CampaignInfo = Object.assign<
          CampaignInfo,
          { campaignMetadata: CampaignMetadata }
        >(campaignData.campaign, { campaignMetadata: data });
        return campaign;
      };

      const fetchData = await fetchCampaignMetaData();
      dispatch({
        type: "campaign:set",
        payload: { campaign: fetchData },
      });
    };
    f();
  }, [tokenAddress, campaignData]);

  useEffect(() => {
    const distributor = distributors.find(
      (distributor) => distributor.id === distributorAddress
    );
    dispatch({
      type: "distributorType:set",
      payload: { distributorType: distributor?.type ?? "" },
    });
  }, [distributorAddress]);

  useEffect(() => {
    dispatch({
      type: "isCampaignClaimable:set",
      payload: {
        isClaimable,
      },
    });
    if (state.distributorType !== "uuid") {
      return;
    }
    if (isClaimable) {
      dispatch({
        type: "isCampaignClaimed:remove",
      });
    } else {
      dispatch({
        type: "isCampaignClaimed:setTrue",
      });
    }
  }, [isClaimable, state.distributorType]);

  useEffect(() => {
    if (allowance === undefined) {
      return;
    }
    dispatch({
      type: "isTokenApproved:set",
      payload: { allowance: allowance },
    });
  }, [allowance]);

  useEffect(() => {
    if (
      tokenState.userAddress === undefined ||
      state.campaignAddress === undefined ||
      state.distributorType === "uuid"
    ) {
      return;
    }
    getClaim({
      variables: {
        id: `${tokenState.userAddress.toLowerCase()}-${state.campaignAddress.toLowerCase()}`,
      },
    });
  }, [
    getClaim,
    tokenState.userAddress,
    state.campaignAddress,
    state.distributorType,
  ]);

  useEffect(() => {
    if (getClaimData === undefined) {
      return;
    }
    dispatch({
      type: "isCampaignClaimed:set",
      payload: {
        claim: getClaimData.claim,
      },
    });
  }, [getClaimData]);

  return (
    <TokenCampaignsDetailTemplate
      active={active}
      state={state}
      tokenAddress={tokenAddress}
      dispatch={dispatch}
    />
  );
};

export default TokenCampaignDetailPage;
