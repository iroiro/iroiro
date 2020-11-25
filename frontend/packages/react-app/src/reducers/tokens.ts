import { TokenBalanceUserHolds, UserToken } from "../interfaces";
import { ethers } from "ethers";

export type ACTIONS =
  | { type: "open_modal" }
  | { type: "close_modal" }
  | { type: "set_tokens"; payload: { data: TokenBalanceUserHolds } };

export interface ExplorePageState {
  isOpen: boolean;
  tokens: UserToken[];
}

export function tokensReducer(state: ExplorePageState, action: ACTIONS) {
  switch (action.type) {
    case "open_modal":
      return { ...state, isOpen: true };
    case "close_modal":
      return { ...state, isOpen: false };
    case "set_tokens":
      if (!action.payload.data.account) {
        return state;
      }
      const tokens = action.payload.data.account.tokens.map((accountToken) => ({
        address: accountToken.token.id,
        name: accountToken.token.name,
        symbol: accountToken.token.symbol,
        balance: ethers.utils.formatUnits(
          accountToken.balance,
          accountToken.token.decimals
        ),
      }));
      return { ...state, tokens: tokens };
    default:
      throw new Error();
  }
}
