import * as React from "react";
import { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import TokenInformationTemplate from "../templates/TokenInformationTemplate";
import {
  initialState,
  tokenInformationReducer,
} from "../../reducers/tokenInformation";
import { useParams, RouteComponentProps } from "react-router-dom";
import { getTokenInfo } from "../../utils/getTokenInfo";

interface Params {
  tokenAddress: string;
}

const TokenInformationPage = (props: RouteComponentProps<Params>) => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokenInformationReducer, initialState);
  const { tokenAddress } = useParams<Params>();

  useEffect(() => {
    if (library && tokenAddress !== "") {
      getTokenInfo(dispatch, library, tokenAddress);
    }
  }, [library, tokenAddress]);

  return <TokenInformationTemplate state={state} dispatch={dispatch} />;
};

export default TokenInformationPage;
