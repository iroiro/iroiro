/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
