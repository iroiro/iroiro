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
      type: "status:update";
      payload: { data: number };
    }
  | {
      type: "depositToken:set";
      payload: { data: string };
    };

export interface CampaignData {
  campaign: CampaignInfo;
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
      };
    case "campaignMetadata:set":
      return {
        ...state,
        campaign: { ...state.campaign, campaignMetadata: action.payload.data },
      };
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
    distributor: distributor,
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
    creator: {
      id: "",
    },
    claimedNum: "-",
    claims: [],
    checkRequests: [],
    merkleRoot: "",
    merkleTreeCid: "",
  },
  depositTokens: "0",
};
