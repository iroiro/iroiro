import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_CAMPAIGN } from "../../graphql/subgraph";
import { useWeb3React } from "@web3-react/core";
import { RouteComponentProps } from "react-router-dom";
import { TokenCampaignsDetailTemplate } from "../templates/TokenCampaignDetailTemplate";
import { useReducer } from "react";
import {
  campaignDetailReducer,
  initialState,
} from "../../reducers/campaignDetail";
import { audiusInitialState, audiusReducer } from "../../reducers/audius";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";
import { useTokenContext } from "../context/token";

const TokenCampaignDetailPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
    campaignAddress: string;
  }>
> = (props) => {
  const [state, dispatch] = useReducer(campaignDetailReducer, initialState);
  const [audiusState, audiusDispatch] = useReducer(
    audiusReducer,
    audiusInitialState
  );
  const [getCampaign, { data: campaignData }] = useLazyQuery(GET_CAMPAIGN);
  const { library } = useWeb3React();
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();
  const tokenAddress = props.match.params.tokenAddress;
  const campaignAddress = props.match.params.campaignAddress;

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
        id: campaignAddress,
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

  return (
    <TokenCampaignsDetailTemplate
      state={state}
      tokenState={tokenState}
      tokenAddress={tokenAddress}
      dispatch={dispatch}
      audiusState={audiusState}
      audiusDispatch={audiusDispatch}
    />
  );
};

export default TokenCampaignDetailPage;
