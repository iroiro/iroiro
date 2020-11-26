import React, { useCallback, useEffect, useState, useReducer } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import { GET_TOKENS_BALANCE_USER_HOLDS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { TokenBalanceUserHolds } from "../../interfaces";
import { tokensReducer } from "../../reducers/tokens";

const initialState = { isOpen: false, tokens: [] };

const ExplorePage = () => {
  const [provider, setProvider] = useState<Web3Provider>();
  const [walletAddress, setWalletAddress] = useState("");
  const [getTokensBalance, { loading, error, data }] = useLazyQuery<
    TokenBalanceUserHolds
  >(GET_TOKENS_BALANCE_USER_HOLDS);

  const [state, dispatch] = useReducer(tokensReducer, initialState);

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
    dispatch({ type: "tokens:set", payload: { data } });
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
    <ExplorePageTemplate loading={loading} state={state} dispatch={dispatch} />
  );
};

export default ExplorePage;
