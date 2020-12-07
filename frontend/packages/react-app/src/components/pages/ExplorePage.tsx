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
    const f = async () => {
      const token = await getTokenInfo(library, state.tokenAddress);
      if (token === undefined) {
        return;
      }
      dispatch({ type: "token:set", payload: { token } });
    };
    f();
  }, [library, state.tokenAddress]);

  return <ExplorePageTemplate state={state} dispatch={dispatch} />;
};

export default ExplorePage;
