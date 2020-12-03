import { CampaignInfo } from "../interfaces";

export type ACTIONS =
  | {
      type: "campaign:get";
      payload: { data: CampaignInfo[] };
    }
  | {
      type: "campaignMetadata:set";
      payload: { data: CampaignInfo[] };
    };

export const campaignReducer = (state: CampaignInfo[], action: ACTIONS) => {
  switch (action.type) {
    case "campaign:get":
      if (action.payload.data.length < 0) {
        return state;
      }
      return action.payload.data;
    case "campaignMetadata:set":
      console.log(action.payload.data);
      return action.payload.data;
    default:
      throw new Error();
  }
};
