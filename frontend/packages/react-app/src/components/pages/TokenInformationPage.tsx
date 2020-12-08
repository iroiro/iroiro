import * as React from "react";
import { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import TokenInformationTemplate from "../templates/TokenInformationTemplate";
import {
  initialState,
  tokenInformationReducer,
} from "../../reducers/tokenInformation";
import { useParams, RouteComponentProps } from "react-router-dom";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";

interface Params {
  tokenAddress: string;
}

const TokenInformationPage = (props: RouteComponentProps<Params>) => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const { tokenAddress } = useParams<Params>();
  const [getCampaigns, { loading, error, data }] = useLazyQuery(GET_CAMPAIGNS);

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
  }, [library, state.token?.tokenAddress]);

  useEffect(() => {
    // TODO: After made campaign creation function, change dynamic value
    getCampaigns({
      variables: {
        creator: "0x84d800dae0bdb31a4de9918782bffcc8d041c1b8",
        token: tokenAddress.toLowerCase(),
      },
    });
  }, [tokenAddress, getCampaigns]);

  useEffect(() => {
    const f = async () => {
      if (!tokenAddress) {
        return;
      }
      if (data === undefined) {
        return;
      }
      const rawCampaigns = data.campaigns;
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
  }, [tokenAddress, data]);

  return <TokenInformationTemplate state={state} dispatch={dispatch} />;
};

export default TokenInformationPage;
