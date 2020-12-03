// import { TokenBasic } from "../interfaces";

export interface CampaignInfo {
  claimAmount: string;
  distributor: {
    id: string;
  };
  id: string;
  status: Number;
  campaignInfoCid: string;
  campaignMetadata: CampaignMetadata;
  startDate: string;
}

export interface CampaignMetadata {
  name: string;
  description: string;
  image: string;
}

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
      return action.payload.data;
    default:
      throw new Error();
  }
};
