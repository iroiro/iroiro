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

import React, { useEffect, useReducer } from "react";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import { tokensReducer } from "../../reducers/tokens";
import { useWeb3React } from "@web3-react/core";
import { getTokenInfo } from "../../utils/web3";
import { TokenListState } from "../../interfaces";

const initialState: TokenListState = {
  isOpen: false,
  tokens: [],
  tokenAddress: "",
  inputTokenAddress: "",
  type: "explore",
  color: "primary",
};

const ExplorePage: React.FC = () => {
  const { library } = useWeb3React();
  const [state, dispatch] = useReducer(tokensReducer, initialState);

  useEffect(() => {
    dispatch({ type: "tokens:getlocal" });
  }, []);

  useEffect(() => {
    const f = async () => {
      const token = await getTokenInfo(library, state.tokenAddress);
      if (token === undefined) {
        return;
      }
      dispatch({ type: "token:set", payload: { token } });
    };
    f();
  }, [library, state.tokenAddress]);

  return <ExplorePageTemplate state={state} dispatch={dispatch} />;
};

export default ExplorePage;
