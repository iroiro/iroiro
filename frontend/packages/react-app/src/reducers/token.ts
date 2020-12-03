import { TokenBasic } from "../interfaces";

export interface TokenInfo {
  token: {
    name: string;
    tokenAddress: string;
  };
}

export type ACTIONS = {
  type: "token:getLocal";
  payload: { tokenAddress: string };
};

export const tokenReducer = (state: TokenInfo, action: ACTIONS) => {
  switch (action.type) {
    case "token:getLocal":
      const tokensJson = window.localStorage.getItem("tokens") as string;
      let tokens = JSON.parse(tokensJson) as TokenBasic[];
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
          token: { name: result[0].name, tokenAddress: result[0].tokenAddress },
        };
      }
      return { ...state };
    default:
      throw new Error();
  }
};
