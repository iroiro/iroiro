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

import { TokenBasic, TokenListState } from "../interfaces";
import { ethers } from "ethers";

export type ACTIONS =
  | { type: "modal:open" }
  | { type: "modal:close" }
  | { type: "token:set"; payload: { token: TokenBasic } }
  | { type: "tokenAddress:input"; payload: { tokenAddress: string } }
  | { type: "tokenAddress:add" }
  | { type: "tokens:getlocal" };

export const tokensReducer = (
  state: TokenListState,
  action: ACTIONS
): TokenListState => {
  switch (action.type) {
    case "modal:open":
      return { ...state, isOpen: true };
    case "modal:close":
      return { ...state, isOpen: false };
    case "token:set":
      state.tokens.push(action.payload.token);
      window.localStorage.setItem("tokens", JSON.stringify(state.tokens));
      return { ...state, tokenAddress: "", tokens: state.tokens };
    case "tokenAddress:input":
      return { ...state, inputTokenAddress: action.payload.tokenAddress };
    case "tokens:getlocal": {
      const tokensJson = window.localStorage.getItem("tokens") as string;
      let tokens = JSON.parse(tokensJson) as TokenBasic[];
      if (tokens === null) {
        tokens = [];
      }
      return { ...state, tokens: tokens };
    }
    case "tokenAddress:add": {
      if (!ethers.utils.isAddress(state.inputTokenAddress)) {
        return { ...state, inputTokenAddress: "", isOpen: false };
      }
      const tokensInfo = window.localStorage.getItem("tokens") as string;
      const tokensData = JSON.parse(tokensInfo) as TokenBasic[];

      if (tokensData !== null) {
        const result = tokensData.filter(
          (token) => token.tokenAddress.indexOf(state.inputTokenAddress) !== -1
        );
        if (result.length > 0) {
          return { ...state, inputTokenAddress: "", isOpen: false };
        }
      }

      return {
        ...state,
        inputTokenAddress: "",
        tokenAddress: state.inputTokenAddress,
        isOpen: false,
      };
    }
    default:
      throw new Error();
  }
};
