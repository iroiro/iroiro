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
import { useWeb3React } from "@web3-react/core";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { GET_CAMPAIGN, GET_CLAIM } from "../../graphql/subgraph";
import { useIsClaimable } from "../../hooks/distributors/useIsClaimable";
import { CampaignInfo, CampaignMetadata, Claim } from "../../interfaces";
import {
  campaignDetailReducer,
  initialState,
} from "../../reducers/campaignDetail";
import distributors from "../../utils/distributors";
import { ethers } from "ethers";
import { NFTCampaignsDetailTemplate } from "../templates/NFTCampaignsDetailPageTemplate";
import { useTokenContext } from "../../context/token";
import { NFTTabType } from "../molecules/NFTTabMenuForFunPage";

const NFTCampaignDetailPage: React.FC<
  RouteComponentProps<{
    campaignId: string;
    distributorAddress: string;
  }>
> = (props) => {
  const campaignId = props.match.params.campaignId;
  const distributorAddress = props.match.params.distributorAddress.toLowerCase();
  const params = new URLSearchParams(useLocation().search);

  const [state, dispatch] = useReducer(campaignDetailReducer, {
    ...initialState,
    currentTab: (params?.get("currentTab") as NFTTabType) ?? "campaigns",
    distributorAddress,
  });
  const [getCampaign, { data: campaignData }] = useLazyQuery(GET_CAMPAIGN);
  const { active, library } = useWeb3React();
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();

  const uuid: string =
    new URLSearchParams(props.location.search)?.get("uuid") ?? "";
  const hashedUUID: string = ethers.utils.solidityKeccak256(["string"], [uuid]);

  const { isClaimable } = useIsClaimable(
    library,
    state?.campaignId ?? "",
    distributorAddress,
    state?.distributorType,
    hashedUUID
  );

  const [getClaim, { data: getClaimData }] = useLazyQuery<{ claim: Claim }>(
    GET_CLAIM
  );

  useEffect(() => {
    dispatch({ type: "uuid:set", payload: { uuid } });
  }, [uuid]);

  useEffect(() => {
    dispatch({ type: "hashedUUID:set", payload: { hashedUUID } });
  }, [hashedUUID]);

  useEffect(() => {
    dispatch({ type: "campaignId:set", payload: { campaignId } });
  }, [campaignId]);

  useEffect(() => {
    if (tokenState.userAddress === "") {
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
    const f = async () => {
      if (library === undefined) {
        console.debug("hoge");
        return;
      }
      getCampaign({
        variables: {
          id: `${distributorAddress.toLowerCase()}-${campaignId}`,
          account: (await library.getSigner().getAddress()).toLowerCase(),
        },
      });
    };
    f();
  }, [campaignId, library, getCampaign]);

  useEffect(() => {
    const f = async () => {
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
  }, [campaignData]);

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
    if (
      tokenState.userAddress === undefined ||
      tokenState.userAddress === "" ||
      state.campaignId === undefined ||
      state.campaignId === "" ||
      state.distributorType === "uuid"
    ) {
      return;
    }
    getClaim({
      variables: {
        id: `${distributorAddress.toLowerCase()}-${
          state.campaignId
        }-${tokenState.userAddress.toLowerCase()}`,
      },
    });
  }, [
    getClaim,
    tokenState.userAddress,
    state.campaignId,
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
    <NFTCampaignsDetailTemplate
      active={active}
      state={state}
      dispatch={dispatch}
    />
  );
};

export default NFTCampaignDetailPage;
