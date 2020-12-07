import { TokenBasic, TokenInformationState } from "../interfaces";

export type TokenInformationAction =
  | {
      type: "token:set";
      payload: {
        token: TokenBasic;
      };
    }
  | {
      type: "userBalance:set";
      payload: {
        balance: string;
      };
    };

export const tokenInformationReducer = (
  state: TokenInformationState,
  action: TokenInformationAction
) => {
  switch (action.type) {
    case "token:set":
      return {
        ...state,
        token: {
          ...action.payload.token,
        },
      };
    case "userBalance:set":
      return {
        ...state,
        userBalance: action.payload.balance,
      };
    default:
      return state;
  }
};

export const initialState: TokenInformationState = {
  token: undefined,
  isTokenApproved: false,
  isTokenRequested: false,
  campaigns: [],
  campaignAddress: undefined,
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  userAddress: undefined,
  userBalance: undefined,
  activities: [],
  balances: [],
};
