import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  // useContext,
} from "react";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3Modal";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import { GET_TOKENS_BALANCE_USER_HOLDS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { ethers } from "ethers";
import { TokenBalanceUserHolds, UserToken } from "../../interfaces";
// import { AppContext } from "../../App";

export type ACTIONS =
  | { type: "open_modal" }
  | { type: "close_modal" }
  | { type: "set_tokens"; payload: { data: TokenBalanceUserHolds } };

export interface ExplorePageState {
  isOpen: boolean;
  tokens: UserToken[];
}

// interface ExplorePageAction {
//   type: string;
//   payload: {
//     data: TokenBalanceUserHolds;
//   };
// }

function reducer(state: ExplorePageState, action: ACTIONS) {
  switch (action.type) {
    case "open_modal":
      return { ...state, isOpen: true };
    case "close_modal":
      return { ...state, isOpen: false };
    case "set_tokens":
      if (!action.payload.data.account) {
        return state;
      }
      const tokens = action.payload.data.account.tokens.map((accountToken) => ({
        address: accountToken.token.id,
        name: accountToken.token.name,
        symbol: accountToken.token.symbol,
        balance: ethers.utils.formatUnits(
          accountToken.balance,
          accountToken.token.decimals
        ),
      }));
      return { ...state, tokens: tokens };
    default:
      throw new Error();
  }
}

const initialState = { isOpen: false, tokens: [] };

const ExplorePage = () => {
  // const appContext = useContext(AppContext);
  // const stateContext = appContext.state;
  // const stateDispatch = appContext.dispatch;

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
    dispatch({ type: "set_tokens", payload: { data } });
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
