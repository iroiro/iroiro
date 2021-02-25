/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import { CampaignInfo, Distributor, CampaignMetadata } from "../interfaces";

export type ACTIONS =
  | {
      type: "campaign:set";
      payload: {
        data: {
          campaign: CampaignInfo;
          canRefund: boolean;
          canCancel: boolean;
        };
      };
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
  canCancel: boolean;
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
        canCancel: action.payload.data.canCancel,
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
  disabled: false,
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
    merkleRoot: "",
    merkleTreeCid: "",
  },
  isCancelRequest: false,
  isRefundRequest: false,
  canRefund: false,
  canCancel: false,
  depositTokens: "0",
};
