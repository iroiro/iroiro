import React, { useEffect, useCallback, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import { tokenReducer, tokenInitialState } from "../../reducers/token";
import { campaignsReducer } from "../../reducers/campaigns";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { CampaignInfo } from "../../interfaces";
import ExternalTokenDetailPageTemplate from "../templates/ExternalTokenDetailPageTemplate";
import { useWeb3React } from "@web3-react/core";

const campaignsInitialState = {
  campaigns: new Array<CampaignInfo>(),
};
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
  const [getCampaigns, { data }] = useLazyQuery(GET_CAMPAIGNS);

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
      getCampaigns({
        variables: {
          creator: account.toLowerCase(),
          token: tokenAddress.toLowerCase(),
        },
      });
    }
  }, [account, tokenAddress, getCampaigns]);

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
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
      <ExternalTokenDetailPageTemplate
        active={active}
        tokenState={tokenState}
        campaignsState={campaignsState}
      />
    </>
  );
};

export default ExternalTokenDetailPage;
