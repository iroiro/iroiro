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

import { ReactNode } from "react";
import { TokenOption } from "../components/atoms/SelectTokenInput";
import { TokenBasic } from "../interfaces";

export interface ProviderValue {
  reducer: (state: TokenState, action: TokenAction) => TokenState;
  initialValue: TokenState;
  children: ReactNode;
}

export interface TokenState {
  token?: TokenBasic;
  userAddress?: string;
  userBalance?: string;
  tokens: TokenOption[]
}

export type TokenAction =
  | {
      type: "token:set";
      payload: {
        token: TokenBasic;
      };
    }
  | {
      type: "userAddress:set";
      payload: {
        address: string;
      };
    }
  | {
      type: "userBalance:set";
      payload: {
        balance: string;
      };
    }
  | {
      type: "tokens:set";
      payload: {
        tokens: Array<TokenOption>
      };
    };

export const tokenReducer = (state: TokenState, action: TokenAction) => {
  switch (action.type) {
    case "token:set":
      return {
        ...state,
        token: {
          ...action.payload.token,
        },
      };
    case "userAddress:set":
      return {
        ...state,
        userAddress: action.payload.address,
      };
    case "userBalance:set":
      return {
        ...state,
        userBalance: action.payload.balance,
      };
      case "tokens:set":
        return {
          ...state,
          tokens: action.payload.tokens
        }
    default:
      return state;
  }
};

export const initialValue: TokenState = {
  token: undefined,
  userAddress: "",
  userBalance: "",
  tokens: []
};
