import { useLazyQuery } from "@apollo/react-hooks/lib/useLazyQuery";
import React, { useEffect, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import { GET_CAMPAIGNS } from "../../graphql/subgraph";
import {
  initialState,
  tokenInformationReducer,
} from "../../reducers/tokenInformation";
import { TokenCampaignsTemplate } from "../templates/TokenCampaignsTemplate";

const TokenCampaignsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const [getCampaigns, { data: campaignData }] = useLazyQuery(GET_CAMPAIGNS);
  console.log(tokenAddress);
  useEffect(() => {
    getCampaigns({
      variables: {
        token: tokenAddress.toLowerCase(),
      },
    });
  }, [tokenAddress, getCampaigns]);
  console.log(campaignData);
  return <TokenCampaignsTemplate state={state} dispatch={dispatch} />;
};

export default TokenCampaignsPage;
