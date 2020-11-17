import React, { useCallback, useEffect, useState, useReducer } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import { GET_TOKENS_BALANCE_USER_HOLDS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { ethers } from "ethers";
import { TokenBalanceUserHolds, UserToken } from "../../interfaces";

export const ACTIONS = {
  OPEN_MODAL: "open_modal",
  CLOSE_MODAL: "close_modal",
  SET_TOKENS: "set_tokens",
};

export interface ExplorePageState {
  isOpen: boolean;
  tokens: UserToken[];
}

interface ExplorePageAction {
  type: string;
  payload: {
    tokens: UserToken[];
  };
}

function reducer(state: ExplorePageState, action: ExplorePageAction) {
  switch (action.type) {
    case ACTIONS.OPEN_MODAL:
      return { ...state, isOpen: true };
    case ACTIONS.CLOSE_MODAL:
      return { ...state, isOpen: false };
    case ACTIONS.SET_TOKENS:
      return { ...state, tokens: action.payload.tokens };
    default:
      throw new Error();
  }
}

const initialState = { isOpen: false, tokens: [] };

const ExplorePage = () => {
  const [provider, setProvider] = useState<Web3Provider>();
  const [walletAddress, setWalletAddress] = useState("");
  const [getTokensBalance, { loading, error, data }] = useLazyQuery<
    TokenBalanceUserHolds
  >(GET_TOKENS_BALANCE_USER_HOLDS);

  const [state, dispatch] = useReducer(reducer, initialState);

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  useEffect(() => {
    if (walletAddress !== "") {
      getTokensBalance({
        variables: { id: walletAddress.toLowerCase() },
      });
    }
  }, [walletAddress, getTokensBalance]);

  useEffect(() => {
    if (loading || error || !data) {
      return;
    }
    if (!data.account) {
      return;
    }
    const tmpTokens = data.account.tokens.map((accountToken) => ({
      address: accountToken.token.id,
      name: accountToken.token.name,
      symbol: accountToken.token.symbol,
      balance: ethers.utils.formatUnits(
        accountToken.balance,
        accountToken.token.decimals
      ),
    }));
    dispatch({ type: ACTIONS.SET_TOKENS, payload: { tokens: tmpTokens } });
  }, [loading, error, data]);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    const f = async () => {
      if (!provider) {
        return;
      }
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setWalletAddress(walletAddress);
    };
    f();
  }, [provider, setWalletAddress]);

  return (
    <ExplorePageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      loading={loading}
      state={state}
      dispatch={dispatch}
    />
  );
};

export default ExplorePage;
