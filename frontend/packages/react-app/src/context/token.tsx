import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
  ProviderValue,
  TokenAction,
  TokenState,
} from "../reducers/tokenContext";

interface TokenContextInterface {
  readonly state: TokenState;
  readonly dispatch: Dispatch<TokenAction>;
}

export const TokenContext = createContext({} as TokenContextInterface);

export const TokenProvider = ({
  reducer,
  initialValue,
  children,
}: ProviderValue) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <TokenContext.Provider value={{ state, dispatch }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => useContext(TokenContext);
