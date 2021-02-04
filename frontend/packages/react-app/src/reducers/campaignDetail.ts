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

import { BigNumber } from "ethers";
import {
  CampaignInfo,
  CheckRequest,
  Claim,
  DistributorTypes,
} from "../interfaces";
import { LINK_APPROVE_AMOUNT } from "../utils/const";

export interface CampaignDetailState {
  isTokenRequested: boolean;
  isTokenApproved: boolean;
  isTokenCheckFinished: boolean;
  campaign: CampaignInfo | null;
  campaignAddress: string;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  now: Date;
  distributorType: DistributorTypes | string;
  hashedUUID: string;
}

export type CampaignDetailAction =
  | {
      type: "isTokenRequested:setTrue";
    }
  | {
      type: "isTokenApproved:setTrue";
    }
  | {
      type: "isTokenCheckFinished:setTrue";
    }
  | {
      type: "isTokenApproved:set";
      payload: {
        allowance: BigNumber;
      };
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
  | {
      type: "distributorType:set";
      payload: {
        distributorType: DistributorTypes | string; // TODO remove string
      };
    }
  | {
      type: "hashedUUID:set";
      payload: {
        hashedUUID: string;
      };
    };

export const campaignDetailReducer = (
  state: CampaignDetailState,
  action: CampaignDetailAction
): CampaignDetailState => {
  switch (action.type) {
    case "isTokenApproved:set": {
      const isTokenApproved = action.payload.allowance.gte(
        BigNumber.from(LINK_APPROVE_AMOUNT)
      );
      return {
        ...state,
        isTokenApproved,
      };
    }
    case "isTokenApproved:setTrue": {
      return {
        ...state,
        isTokenApproved: true,
      };
    }
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
        campaign: action.payload.campaign,
      };
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
    case "distributorType:set": {
      return {
        ...state,
        distributorType: action.payload.distributorType,
      };
    }
    case "hashedUUID:set": {
      return {
        ...state,
        hashedUUID: action.payload.hashedUUID,
      };
    }
    default:
      return state;
  }
};

export const initialState: CampaignDetailState = {
  isTokenRequested: false,
  isTokenApproved: false,
  isTokenCheckFinished: false,
  campaign: null,
  campaignAddress: "",
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  now: new Date(),
  distributorType: "",
  hashedUUID: "",
};
