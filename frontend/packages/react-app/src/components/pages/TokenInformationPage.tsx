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
import {
  GET_CAMPAIGNS,
  GET_CHECK_REQUEST,
  GET_CLAIM,
} from "../../graphql/subgraph";
import { CampaignInfo, CampaignMetadata, Claim } from "../../interfaces";
import { useGetWalletBalance } from "../../hooks/useGetWalletBalance";
import { useGetAllowance } from "../../hooks/useGetAllowance";
import { LINK_TOKEN_ADDRESS } from "../../utils/const";
import { useGetTransferEvents } from "../../hooks/useGetTransferEvents";
import { Block } from "@ethersproject/providers";
import { Event } from "@ethersproject/contracts";
import { useAudiusLibs } from "../../hooks/audius/useAudiusLibs";
import Web3 from "web3";
import { Sign } from "web3-core";
import { useGetAudiusUserOrSignIn } from "../../hooks/audius/useGetAudiusUser";
import { audiusInitialState, audiusReducer } from "../../reducers/audius";
import { useIsClaimable } from "../../hooks/distributors/audius-followers/useIsClaimable";

interface Params {
  tokenAddress: string;
}

const TokenInformationPage: React.FC<RouteComponentProps<Params>> = () => {
  const { library, active } = useWeb3React();
  const [audiusState, audiusDispatch] = useReducer(
    audiusReducer,
    audiusInitialState
  );
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const { tokenAddress } = useParams<Params>();
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);
  const [getCheckRequests, { data: checkRequestsData }] = useLazyQuery(
    GET_CHECK_REQUEST
  );
  const [getClaim, { data: getClaimData }] = useLazyQuery<{ claim: Claim }>(
    GET_CLAIM
  );
  const { loading, error } = useGetWalletBalance(library, tokenAddress);
  const { allowance } = useGetAllowance(
    library,
    LINK_TOKEN_ADDRESS,
    state?.campaignAddress ?? ""
  );
  const { result: allTransferEvents } = useGetTransferEvents(
    library,
    tokenAddress
  );
  const { libs, isLibsInitialized } = useAudiusLibs();
  const user = useGetAudiusUserOrSignIn(
    audiusState.libs,
    audiusState.email,
    audiusState.password,
    audiusState.requestSignin
  );
  const { isClaimable } = useIsClaimable(
    library,
    state?.campaignAddress ?? "",
    user?.wallet ?? ""
  );

  useEffect(() => {
    audiusDispatch({ type: "libs:set", payload: { libs } });
  }, [libs]);

  useEffect(() => {
    audiusDispatch({ type: "user:set", payload: { user } });
  }, [user]);

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
    // TODO: After made campaign creation function, change dynamic value
    getCampaigns({
      variables: {
        creator: "0x84d800dae0bdb31a4de9918782bffcc8d041c1b8",
        token: tokenAddress.toLowerCase(),
      },
    });
  }, [loading, error, tokenAddress, getCampaigns]);

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
  }, [checkRequestsData]);

  useEffect(() => {
    dispatch({
      type: "isCampaignClaimable:set",
      payload: {
        isClaimable,
      },
    });
  }, [isClaimable]);

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
      state.userAddress === undefined ||
      state.campaignAddress === undefined
    ) {
      return;
    }
    getClaim({
      variables: {
        id: `${state.userAddress.toLowerCase()}-${state.campaignAddress.toLowerCase()}`,
      },
    });
  }, [getClaim, state.userAddress, state.campaignAddress]);

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

  useEffect(() => {
    const f = async () => {
      if (allTransferEvents === undefined || state.userAddress === undefined) {
        return;
      }
      const eventBlockPairs: {
        event: Event;
        block: Block;
      }[] = await Promise.all(
        allTransferEvents.map(async (event) => {
          const block = await event.getBlock();
          return { event, block };
        })
      );
      dispatch({
        type: "activities:setTransfers",
        payload: {
          eventBlockPairs,
        },
      });
      dispatch({
        type: "balances:set",
        payload: {
          walletAddress: state.userAddress,
          eventBlockPairs,
        },
      });
    };
    f();
  }, [allTransferEvents, state.userAddress]);

  return (
    <TokenInformationTemplate
      state={state}
      dispatch={dispatch}
      active={active}
      audiusState={audiusState}
      audiusDispatch={audiusDispatch}
    />
  );
};

export default TokenInformationPage;
