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

import { TokenBasic, AccountToken } from "../interfaces";

export type ACTIONS =
  | {
      type: "token:getLocal";
      payload: { tokenAddress: string };
    }
  | {
      type: "token:setBalance";
      payload: { tokenBalance: string };
    }
  | {
      type: "token:setAllowance";
      payload: { allowance: string };
    }
  | {
      type: "token:approve";
      payload: { approveAmount: string };
    };

export const tokenReducer = (
  state: AccountToken,
  action: ACTIONS
): AccountToken => {
  switch (action.type) {
    case "token:getLocal": {
      const tokensJson = window.localStorage.getItem("tokens") as string;
      const tokens = JSON.parse(tokensJson) as TokenBasic[];
      if (tokens === null) {
        return state;
      }
      const result = tokens.filter(
        (token) =>
          token.tokenAddress.indexOf(action.payload.tokenAddress) !== -1
      );
      if (
        result.length > 0 &&
        result[0].tokenAddress === action.payload.tokenAddress
      ) {
        return {
          ...state,
          token: {
            name: result[0].name,
            tokenAddress: result[0].tokenAddress,
            symbol: result[0].symbol,
            decimals: result[0].decimals,
            totalSupply: result[0].totalSupply,
          },
        };
      }
      return { ...state };
    }
    case "token:setBalance": {
      return { ...state, balance: action.payload.tokenBalance };
    }
    case "token:setAllowance": {
      return { ...state, allowance: action.payload.allowance };
    }
    default:
      throw new Error();
  }
};

export const tokenInitialState: AccountToken = {
  token: undefined,
  balance: undefined,
  allowance: undefined,
};
