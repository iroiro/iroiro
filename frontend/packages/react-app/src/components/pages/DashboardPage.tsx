import React, { useEffect, useReducer } from "react";
import Dashboard from "../templates/DashboardPageTemplate";
import { tokensReducer } from "../../reducers/tokens";
import { useWeb3React } from "@web3-react/core";
import { getTokenInfo } from "../../utils/web3";
import { TokenListState } from "../../interfaces";

const initialState: TokenListState = {
  isOpen: false,
  tokens: [],
  tokenAddress: "",
  inputTokenAddress: "",
  type: "dashboard",
  color: "secondary",
};

const DashboardPage: React.FC = () => {
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

  return <Dashboard state={state} dispatch={dispatch} />;
};

export default DashboardPage;
