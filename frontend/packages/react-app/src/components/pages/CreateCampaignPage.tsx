import React, { useEffect, useReducer, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import CreateCampaignPageTemaplate from "../templates/CreateCampaignPageTemaplate";
import { getWalletBalance } from "../../utils/web3";
import { tokenReducer, tokenInitialState } from "../../reducers/token";

// const ExternalTokenDetailPage: React.FC<RouteComponentProps<{
//   tokenAddress: string;
// }>> = (props) => {
//   const { active } = useWeb3React();
//   const tokenAddress = props.match.params.tokenAddress;

const CreateCampaignPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const { library, active } = useWeb3React();
  const tokenAddress = props.match.params.tokenAddress;
  const [state, dispatch] = useReducer(tokenReducer, tokenInitialState);

  const getBalance = useCallback(async (library) => {
    const balance = await getWalletBalance(library, tokenAddress);
    if (balance === undefined) {
      return;
    }
    dispatch({
      type: "token:setBalance",
      payload: { tokenBalance: balance },
    });
  }, []);

  useEffect(() => {
    if (library) {
      getBalance(library);
    }
  }, [library, tokenAddress]);

  useEffect(() => {
    dispatch({
      type: "token:getLocal",
      payload: { tokenAddress: tokenAddress },
    });
  }, []);

  return (
    <>
      <CreateCampaignPageTemaplate
        active={active}
        tokenInfo={state}
        targets={[]}
        targetNumber={10000}
      />
    </>
  );
};

export default CreateCampaignPage;
