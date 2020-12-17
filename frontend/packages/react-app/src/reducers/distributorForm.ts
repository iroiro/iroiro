import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export type DISTRIBUTOR_ACTIONS =
  | {
      type: "approveAmount:set";
      payload: { approveAmount: string };
    }
  | { type: "campaignName:set"; payload: { campaignName: string } }
  | { type: "startDate:set"; payload: { startDate: MaterialUiPickersDate } }
  | { type: "endDate:set"; payload: { endDate: MaterialUiPickersDate } }
  | { type: "token:approve"; payload: { approveRequest: boolean } }
  | {
      type: "campaign:deploy";
      payload: { requestDeployCampaign: boolean };
    };

export interface createCampaignState {
  approveAmount: string;
  campaignName: string;
  startDate: MaterialUiPickersDate;
  endDate: MaterialUiPickersDate;
  approveRequest: boolean;
  requestDeployCampaign: boolean;
}

export const distributorFormReducer = (
  state: createCampaignState,
  action: DISTRIBUTOR_ACTIONS
): createCampaignState => {
  switch (action.type) {
    case "approveAmount:set": {
      return {
        ...state,
        approveAmount: action.payload.approveAmount,
        approveRequest: false,
      };
    }
    case "campaignName:set": {
      return { ...state, campaignName: action.payload.campaignName };
    }
    case "startDate:set": {
      return { ...state, startDate: action.payload.startDate };
    }
    case "endDate:set": {
      return { ...state, endDate: action.payload.endDate };
    }
    case "token:approve": {
      return { ...state, approveRequest: action.payload.approveRequest };
    }
    case "campaign:deploy": {
      console.log("aaaaa");
      return {
        ...state,
        requestDeployCampaign: action.payload.requestDeployCampaign,
      };
    }
    default:
      throw new Error();
  }
};

export const distributorFormInitialState: createCampaignState = {
  approveAmount: "",
  campaignName: "",
  startDate: new Date("2021-01-01T00:00:00"),
  endDate: new Date("2021-01-01T00:00:00"),
  approveRequest: false,
  requestDeployCampaign: false,
};
