import { CampaignInfo, TokenBasic } from "../interfaces";

export interface TokenCampaignsState {
  token?: TokenBasic;
  userAddress?: string;
  userBalance?: string;
  campaigns: CampaignInfo[];
}

export const initialState: TokenCampaignsState = {
  token: undefined,
  userAddress: undefined,
  userBalance: undefined,
  campaigns: []
}

export type TokenCampaignsAction =
| {
  type: "token:set";
  payload: {
    token: TokenBasic;
  };
}
| {
  type: "campaigns:set";
  payload: {
    campaigns: CampaignInfo[];
  };
}   | {
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

export const tokenCampaignsReducer = (
  state: TokenCampaignsState,
   action: TokenCampaignsAction
   ): TokenCampaignsState => {
  switch(action.type) {
    case "token:set":
      return {
        ...state,
        token: action.payload.token
      }
      case "campaigns:set":
      return {
        ...state,
        campaigns: action.payload.campaigns,
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
  }
}