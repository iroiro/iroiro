import React, { useEffect, useReducer } from "react";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import { tokensReducer } from "../../reducers/tokens";
import { useWeb3React } from "@web3-react/core";
import { getTokenInfo } from "../../utils/getTokenInfo";

const initialState = {
  isOpen: false,
  tokens: [],
  tokenAddress: "",
  inputTokenAddress: "",
  type: "explore",
  color: "itred",
};

const ExplorePage = () => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokensReducer, initialState);

  useEffect(() => {
    dispatch({ type: "tokens:getlocal" });
  }, []);

  useEffect(() => {
    if (library && state.tokenAddress !== "") {
      getTokenInfo(dispatch, library, state.tokenAddress);
    }
  }, [library, state.tokenAddress]);

  return <ExplorePageTemplate state={state} dispatch={dispatch} />;
};

export default ExplorePage;
