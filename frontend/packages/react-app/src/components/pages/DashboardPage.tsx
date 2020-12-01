import React, { useEffect, useReducer } from "react";
import Dashboard from "../templates/DashboardPageTemplate";
import { tokensReducer } from "../../reducers/tokens";
import { useWeb3React } from "@web3-react/core";
import { getTokenInfo } from "../../utils/getTokenInfo";

const initialState = {
  isOpen: false,
  tokens: [],
  tokenAddress: "",
  inputTokenAddress: "",
  type: "dashboard",
  color: "itblue",
};

const DashboardPage = () => {
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

  return <Dashboard state={state} dispatch={dispatch} />;
};

export default DashboardPage;
