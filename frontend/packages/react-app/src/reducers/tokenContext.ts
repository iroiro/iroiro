import { ReactNode } from "react";
import { TokenBasic } from "../interfaces";

export interface ProviderValue {
  reducer: (state: TokenState, action: TokenAction) => TokenState
  initialValue: TokenState
  children: ReactNode
}

export interface TokenState {
  token?: TokenBasic;
  userAddress?: string;
  userBalance?: string;
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

export const tokenReducer = (state: TokenState, action: TokenAction) => {
  switch(action.type) {
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
    default:
      return state;
  }
}

export const initialValue = {
  token: undefined,
  userAddress: '',
  userBalance: ''
}

