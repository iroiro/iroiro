import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { useTokenContext } from "../context/token";
import { TokenBasicInformationTemplate } from "../templates/TokenBasicInformationTemplate";

interface Params {
  tokenAddress: string;
}

const TokenBasicInformationPage: React.FC<RouteComponentProps<Params>> = () => {
  const { library } = useWeb3React();
  const { tokenAddress } = useParams<Params>();
  const [tokenState, tokenStateDispatch] = useTokenContext();

  useEffect(() => {
    if (
      tokenState.token === undefined ||
      tokenState.token.tokenAddress !== tokenAddress
    ) {
      const f = async () => {
        const token = await getTokenInfo(library, tokenAddress);
        if (token === undefined) {
          return;
        }
        tokenStateDispatch({ type: "token:set", payload: { token } });
      };
      f();
    }
  }, [library, tokenAddress]);
  useEffect(() => {
    if (
      tokenState.userAddress === "" ||
      tokenState.token.tokenAddress !== tokenAddress
    ) {
      const f = async () => {
        if (library === undefined) {
          return;
        }
        const address = await library.getSigner().getAddress();
        tokenStateDispatch({
          type: "userAddress:set",
          payload: {
            address,
          },
        });
      };
      f();
    }
  }, [library, tokenStateDispatch]);
  useEffect(() => {
    if (
      tokenState.userBalance === "" ||
      tokenState.token.tokenAddress !== tokenAddress
    ) {
      if (!library) {
        return;
      }
      const f = async () => {
        const balance = await getWalletBalance(library, tokenAddress);
        if (balance === undefined) {
          return;
        }
        tokenStateDispatch({ type: "userBalance:set", payload: { balance } });
      };
      f();
    }
  }, [library, tokenState.token, tokenStateDispatch]);

  return <TokenBasicInformationTemplate tokenAddress={tokenAddress} />;
};

export default TokenBasicInformationPage;
