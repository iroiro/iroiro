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
