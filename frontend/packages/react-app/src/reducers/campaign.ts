import { CampaignInfo, Campaigns } from "../interfaces";

export type ACTIONS =
  | {
      type: "campaign:get";
      payload: { data: CampaignInfo[] };
    }
  | {
      type: "campaignMetadata:set";
      payload: { data: CampaignInfo[] };
    };

export const campaignReducer = (
  state: Campaigns,
  action: ACTIONS
): Campaigns => {
  switch (action.type) {
    case "campaign:get":
      if (action.payload.data.length < 0) {
        return state;
      }
      return { ...state, campaigns: action.payload.data };
    case "campaignMetadata:set":
      console.log(action.payload.data);
      return { ...state, campaigns: action.payload.data };
    default:
      return state;
  }
};
