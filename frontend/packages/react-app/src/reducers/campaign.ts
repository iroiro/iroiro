import { CampaignInfo, Distributor, CampaignMetadata } from "../interfaces";

export type ACTIONS =
  | {
      type: "campaign:set";
      payload: { data: { campaign: CampaignInfo; canRefund: boolean } };
    }
  | {
      type: "campaignMetadata:set";
      payload: { data: CampaignMetadata };
    }
  | {
      type: "campaign:cancel";
      payload: { data: boolean };
    }
  | {
      type: "campaign:refund";
      payload: { data: boolean };
    }
  | {
      type: "status:update";
      payload: { data: number };
    }
  | {
      type: "depositToken:set";
      payload: { data: string };
    };

export interface CampaignData {
  campaign: CampaignInfo;
  isCancelRequest: boolean;
  isRefundRequest: boolean;
  canRefund: boolean;
  depositTokens: string;
}

export const campaignReducer = (
  state: CampaignData,
  action: ACTIONS
): CampaignData => {
  switch (action.type) {
    case "campaign:set":
      return {
        ...state,
        campaign: action.payload.data.campaign,
        canRefund: action.payload.data.canRefund,
      };
    case "campaignMetadata:set":
      return {
        ...state,
        campaign: { ...state.campaign, campaignMetadata: action.payload.data },
      };
    case "campaign:cancel":
      return { ...state, isCancelRequest: action.payload.data };
    case "status:update":
      return {
        ...state,
        campaign: { ...state.campaign, status: action.payload.data },
      };
    case "campaign:refund":
      return { ...state, isRefundRequest: action.payload.data };
    case "depositToken:set":
      return { ...state, depositTokens: action.payload.data };
    default:
      return state;
  }
};

const distributor: Distributor = {
  id: "",
  distributorCid: "",
  distributorMetadata: {
    name: "",
    description: "",
    image: "",
  },
  type: "",
  version: "",
};

const campaignMetadata: CampaignMetadata = {
  name: "-",
  description: "",
  image: "",
};

export const campaignInitialState: CampaignData = {
  campaign: {
    id: "",
    campaignInfoCid: "",
    campaignMetadata: campaignMetadata,
    claimAmount: "0",
    distributor: distributor,
    startDate: "-",
    status: 0,
    claimed: 0,
    token: {
      token: {
        tokenAddress: "",
        name: "",
        symbol: "",
        decimals: 0,
        totalSupply: "",
      },
      balance: "",
    },
    endDate: "-",
    creator: {
      id: "",
    },
    recipientsCid: "",
    claimedNum: "-",
    claims: [],
    checkRequests: [],
  },
  isCancelRequest: false,
  isRefundRequest: false,
  canRefund: false,
  depositTokens: "0",
};
