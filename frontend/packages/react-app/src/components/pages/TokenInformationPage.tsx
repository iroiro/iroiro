import * as React from "react";
import { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import TokenInformationTemplate from "../templates/TokenInformationTemplate";
import {
  initialState,
  tokenInformationReducer,
} from "../../reducers/tokenInformation";
import { useParams, RouteComponentProps } from "react-router-dom";
import { getTokenInfo } from "../../utils/web3";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_CAMPAIGNS, GET_CHECK_REQUEST } from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata } from "../../interfaces";
import { useGetWalletBalance } from "../../hooks/useGetWalletBalance";
import { useGetAllowance } from "../../hooks/useGetAllowance";
import { LINK_TOKEN_ADDRESS } from "../../utils/const";

interface Params {
  tokenAddress: string;
}

const TokenInformationPage = (props: RouteComponentProps<Params>) => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const { tokenAddress } = useParams<Params>();
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);
  const [getCheckRequests, { data: checkRequestsData }] = useLazyQuery(
    GET_CHECK_REQUEST
  );
  const { result, loading, error } = useGetWalletBalance(library, tokenAddress);

  const { allowance } = useGetAllowance(
    library,
    LINK_TOKEN_ADDRESS,
    state?.campaignAddress ?? ""
  );

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
    if (result === undefined || loading || error) {
      return;
    }
    dispatch({
      type: "userBalance:set",
      payload: { balance: result.toString() },
    });
  }, [result, loading, error]);

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

  useEffect(() => {
    if (
      state.userAddress === undefined ||
      state.campaignAddress === undefined
    ) {
      return;
    }
    getCheckRequests({
      variables: {
        account: state.userAddress.toLowerCase(),
        campaign: state.campaignAddress.toLowerCase(),
      },
    });
  }, [getCheckRequests, state.userAddress, state.campaignAddress]);

  useEffect(() => {
    if (checkRequestsData === undefined) {
      return;
    }
    dispatch({
      type: "isTokenCheckFinished:set",
      payload: {
        checkRequests: checkRequestsData.checkRequests,
      },
    });
    dispatch({
      type: "isCampaignClaimable:set",
      payload: {
        checkRequests: checkRequestsData.checkRequests,
      },
    });
  }, [checkRequestsData]);

  useEffect(() => {
    if (allowance === undefined) {
      return;
    }
    dispatch({
      type: "isTokenApproved:set",
      payload: { allowance: allowance },
    });
  }, [allowance]);

  return <TokenInformationTemplate state={state} dispatch={dispatch} />;
};

export default TokenInformationPage;
