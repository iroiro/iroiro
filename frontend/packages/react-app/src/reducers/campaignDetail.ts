import { CampaignInfo, CheckRequest, Claim, TokenBasic } from "../interfaces";

export interface CampaignDetailState {
  isTokenRequested: boolean;
  isTokenCheckFinished: boolean;
  campaign: CampaignInfo | null;
  campaignAddress: string,
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  now: Date;
}

export type CampaignDetailAction = | {
    type: "isTokenRequested:setTrue";
  }
| {
    type: "isTokenCheckFinished:setTrue";
  }
| {
    type: "isTokenCheckFinished:set";
    payload: {
      checkRequests: CheckRequest[] | undefined;
    };
  }
| {
    type: "isTokenCheckFinished:remove";
  }
| {
    type: "campaign:set";
    payload: {
      campaign: CampaignInfo;
    };
  }
| {
    type: "campaignAddress:set";
    payload: {
      campaignAddress: string;
    };
  }
| {
  type: "isCampaignClaimable:setTrue";
}
| {
    type: "isCampaignClaimable:set";
    payload: {
      isClaimable: boolean;
    };
  }
| {
    type: "isCampaignClaimable:remove";
  }
| {
    type: "isCampaignClaimed:setTrue";
  }
| {
    type: "isCampaignClaimed:set";
    payload: {
      claim: Claim;
    };
  }
| {
    type: "isCampaignClaimed:remove";
  }

export const campaignDetailReducer = (
  state: CampaignDetailState,
  action: CampaignDetailAction
): CampaignDetailState => {
  switch(action.type) {
    case "isTokenRequested:setTrue": {
      return {
        ...state,
        isTokenRequested: true,
      };
    }
    case "isTokenCheckFinished:setTrue": {
      return {
        ...state,
        isTokenCheckFinished: true,
      };
    }
    case "isTokenCheckFinished:set": {
      if (!action.payload.checkRequests) {
        return state;
      }
      const isTokenCheckFinished =
        action.payload.checkRequests.filter((req) => req.status !== 0).length >
        0;
      return {
        ...state,
        isTokenCheckFinished,
      };
    }
    case "isTokenCheckFinished:remove": {
      return {
        ...state,
        isTokenCheckFinished: false,
      };
    }
    case "campaign:set": {
      return {
        ...state,
        campaign: action.payload.campaign
      }
    }
    case "campaignAddress:set":
        return {
          ...state,
          campaignAddress: action.payload.campaignAddress,
        };
    case "isCampaignClaimable:setTrue": {
      return {
        ...state,
        isCampaignClaimable: true,
      };
    }
    case "isCampaignClaimable:set": {
      return {
        ...state,
        isCampaignClaimable: action.payload.isClaimable,
      };
    }
    case "isCampaignClaimable:remove": {
      return {
        ...state,
        isCampaignClaimable: false,
      };
    }
    case "isCampaignClaimed:setTrue": {
      return {
        ...state,
        isCampaignClaimed: true,
      };
    }
    case "isCampaignClaimed:set": {
      if (!action.payload.claim) {
        return state;
      }
      return {
        ...state,
        isCampaignClaimed: true,
      };
    }
    case "isCampaignClaimed:remove": {
      return {
        ...state,
        isCampaignClaimed: false,
      };
    }
    default:
      return state;
  }
}

export const initialState: CampaignDetailState = {
  isTokenRequested: false,
  isTokenCheckFinished: false,
  campaign: null,
  campaignAddress: '',
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  now: new Date()
}

