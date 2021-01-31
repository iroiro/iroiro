import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useGetTransferEvents } from "../../hooks/useGetTransferEvents";
import { tokenHistoryReducer, initialState } from "../../reducers/tokenHistory";
import { getTokenInfo, getWalletBalance } from "../../utils/web3";
import { TokenhistoryTemplate } from "../templates/TokenHistoryTemplate";
import { Block } from "@ethersproject/providers";
import { Event } from "@ethersproject/contracts";
import { useTokenContext } from "../context/token";

interface Params {
  tokenAddress: string;
}

const TokenHistoryPage: React.FC = () => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokenHistoryReducer, initialState);
  const { state: tokenState, dispatch: tokenStateDispatch } = useTokenContext();
  const { tokenAddress } = useParams<Params>();
  const { result: allTransferEvents } = useGetTransferEvents(
    library,
    tokenAddress
  );

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
      tokenState.token?.tokenAddress !== tokenAddress
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
      tokenState.token?.tokenAddress !== tokenAddress
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

  useEffect(() => {
    const f = async () => {
      if (allTransferEvents === undefined || state.userAddress === undefined) {
        return;
      }
      const eventBlockPairs: {
        event: Event;
        block: Block;
      }[] = await Promise.all(
        allTransferEvents.map(async (event) => {
          const block = await event.getBlock();
          return { event, block };
        })
      );
      dispatch({
        type: "activities:setTransfers",
        payload: {
          eventBlockPairs,
        },
      });
      dispatch({
        type: "balances:set",
        payload: {
          walletAddress: state.userAddress,
          eventBlockPairs,
        },
      });
    };
    f();
  }, [allTransferEvents, state.userAddress]);

  return <TokenhistoryTemplate state={state} tokenAddress={tokenAddress} />;
};

export default TokenHistoryPage;
