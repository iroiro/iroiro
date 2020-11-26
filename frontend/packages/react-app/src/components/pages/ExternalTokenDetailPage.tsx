import React, { useEffect, useCallback, useReducer } from "react";
import { RouteComponentProps } from "react-router-dom";
import { tokenReducer } from "../../reducers/token";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
// @ts-ignore
import { abis } from "@project/contracts";
import ExternalTokenDetailPageTemplate from "../templates/ExternalTokenDetailPageTemplate";

interface Props extends RouteComponentProps<{ address: string }> {}

const initialState = {
  token: {
    name: "",
    tokenAddress: "",
  },
};

const ExternalTokenDetailPage = (props: Props) => {
  const { library, account } = useWeb3React();
  const [state, dispatch] = useReducer(tokenReducer, initialState);

  const tokenAddress: string = props.match.params.address;

  const getTokenInfo = useCallback(async (library) => {
    const signer = library.getSigner(account);
    const erc20 = new Contract(tokenAddress, abis.fanToken, signer);
    const name: string = await erc20.name();
    const token = {
      name: name,
      tokenAddress: tokenAddress,
    };
    dispatch({ type: "SET_TOKEN", payload: { token } });
  }, []);

  useEffect(() => {
    if (library) {
      getTokenInfo(library);
    }
  }, [library, account]);

  return (
    <>
      <ExternalTokenDetailPageTemplate state={state} />
    </>
  );
};

export default ExternalTokenDetailPage;
