import React, { createContext, useContext, useReducer } from "react";
import { ProviderValue } from "../../reducers/tokenContext";

export const TokenContext: any = createContext({});

export const TokenProvider = ({
  reducer,
  initialValue,
  children,
}: ProviderValue) => (
  <TokenContext.Provider value={useReducer(reducer, initialValue)}>
    {children}
  </TokenContext.Provider>
);

export const useTokenContext: any = () => useContext(TokenContext);
