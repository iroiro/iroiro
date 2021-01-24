import { useLazyQuery } from "@apollo/react-hooks/lib/useLazyQuery";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";
import {
  tokenCampaignsReducer,
  initialState,
} from "../../reducers/TokenCampaigns";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { TokenCampaignsTemplate } from "../templates/TokenCampaignsTemplate";

const TokenCampaignsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const { library } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;
  const [state, dispatch] = useReducer(tokenCampaignsReducer, initialState);
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);

  useEffect(() => {
    getCampaigns({
      variables: {
        token: tokenAddress.toLowerCase(),
      },
    });
  }, [tokenAddress, getCampaigns]);
  useEffect(() => {
    const f = async () => {
      if (library === undefined) {
        return;
      }
      const address = await library.getSigner().getAddress();
      dispatch({
        type: "userAddress:set",
        payload: {
          address,
        },
      });
    };
    f();
  }, [library, dispatch]);
  useEffect(() => {
    const f = async () => {
      const token = await getTokenInfo(library, tokenAddress);
      if (token === undefined) {
        return;
      }
      dispatch({ type: "token:set", payload: { token } });
    };
    f();
  }, [library, tokenAddress]);
  useEffect(() => {
    if (!library) {
      return;
    }
    const f = async () => {
      const balance = await getWalletBalance(
        library,
        state.token?.tokenAddress ?? ""
      );
      if (balance === undefined) {
        return;
      }
      dispatch({ type: "userBalance:set", payload: { balance } });
    };
    f();
  }, [library, state.token]);
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

  return <TokenCampaignsTemplate state={state} />;
};

export default TokenCampaignsPage;
