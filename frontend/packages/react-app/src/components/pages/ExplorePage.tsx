import React, { useCallback, useEffect, useState, useReducer } from "react";
import { Web3Provider } from "@ethersproject/providers";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
// import { GET_TOKENS_BALANCE_USER_HOLDS } from "../../graphql/subgraph";
// import { useLazyQuery } from "@apollo/react-hooks";
import { tokensReducer } from "../../reducers/tokens";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
// @ts-ignore
import { abis } from "@project/contracts";

const initialState = {
  isOpen: false,
  tokens: [],
  tokenAddress: "",
  inputTokenAddress: "",
};

const ExplorePage = () => {
  const { library } = useWeb3React();
  // const [getTokensBalance, { loading, error, data }] = useLazyQuery<
  //   TokenBalanceUserHolds
  // >(GET_TOKENS_BALANCE_USER_HOLDS);

  const [state, dispatch] = useReducer(tokensReducer, initialState);

  useEffect(() => {
    dispatch({ type: "tokens:getlocal" });
  }, []);

  useEffect(() => {
    console.log(state.inputTokenAddress);
    if (library && state.tokenAddress !== "") {
      getTokenInfo(library, state.tokenAddress);
    }
  }, [library, state.tokenAddress]);

  const getTokenInfo = useCallback(async (library, tokenAddress) => {
    const signer = library.getSigner();
    const erc20 = new Contract(tokenAddress, abis.fanToken, signer);
    const name = (await erc20.name()) as string;
    const symbol = (await erc20.symbol()) as string;
    const decimals = (await erc20.decimals()) as number;
    const totalSupply = (await erc20.totalSupply()) as number;
    const token = {
      tokenAddress: tokenAddress,
      name: name,
      symbol: symbol,
      decimals: decimals,
      totalSupply: totalSupply,
    };
    dispatch({ type: "token:set", payload: { data: token } });
  }, []);

  return <ExplorePageTemplate state={state} dispatch={dispatch} />;
};

export default ExplorePage;
