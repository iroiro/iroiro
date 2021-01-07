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
