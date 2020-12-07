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

interface Params {
  tokenAddress: string;
}

const TokenInformationPage = (props: RouteComponentProps<Params>) => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const { tokenAddress } = useParams<Params>();

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

  return <TokenInformationTemplate state={state} dispatch={dispatch} />;
};

export default TokenInformationPage;
