import { CampaignInfo } from "../interfaces";

export interface TokenCampaignsState {
  campaigns: CampaignInfo[];
}

export const initialState: TokenCampaignsState = {
  campaigns: []
}

export type TokenCampaignsAction =
| {
  type: "campaigns:set";
  payload: {
    campaigns: CampaignInfo[];
  };
}

export const tokenCampaignsReducer = (
  state: TokenCampaignsState,
   action: TokenCampaignsAction
   ): TokenCampaignsState => {
  switch(action.type) {
      case "campaigns:set":
      return {
        ...state,
        campaigns: action.payload.campaigns,
      };
  }
}