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

import { CampaignInfo, Claim, DistributorTypes } from "../interfaces";
import { DialogStatus } from "./distributorForm";
import { NFTTabType } from "../components/molecules/NFTTabMenuForFunPage";

export interface CampaignDetailState {
  campaign: CampaignInfo | null;
  campaignId: string;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  isProofPresent: boolean;
  currentTab: NFTTabType;
  distributorAddress: string;
  distributorType: DistributorTypes | string;
  uuid: string;
  hashedUUID: string;
  dialog: DialogStatus;
  transactionHash: string;
}

export type CampaignDetailAction =
  | {
      type: "campaign:set";
      payload: {
        campaign: CampaignInfo;
      };
    }
  | {
      type: "campaignId:set";
      payload: {
        campaignId: string;
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
      type: "isProofPresent:set";
      payload: {
        isProofPresent: boolean;
      };
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
      type: "distributorAddress:set";
      payload: {
        distributorAddress: string;
      };
    }
  | {
      type: "distributorType:set";
      payload: {
        distributorType: DistributorTypes | string; // TODO remove string
      };
    }
  | {
      type: "uuid:set";
      payload: {
        uuid: string;
      };
    }
  | {
      type: "hashedUUID:set";
      payload: {
        hashedUUID: string;
      };
    }
  | {
      // TODO merge with distributionForm
      type: "dialog:set";
      payload: {
        dialog: DialogStatus;
      };
    }
  | {
      type: "transactionHash:set";
      payload: {
        transactionHash: string;
      };
    };

export const campaignDetailReducer = (
  state: CampaignDetailState,
  action: CampaignDetailAction
): CampaignDetailState => {
  switch (action.type) {
    case "campaign:set": {
      return {
        ...state,
        campaign: action.payload.campaign,
      };
    }
    case "campaignId:set":
      return {
        ...state,
        campaignId: action.payload.campaignId,
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
    case "isProofPresent:set": {
      return {
        ...state,
        isProofPresent: action.payload.isProofPresent,
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
    case "distributorAddress:set": {
      return {
        ...state,
        distributorAddress: action.payload.distributorAddress,
      };
    }
    case "distributorType:set": {
      return {
        ...state,
        distributorType: action.payload.distributorType,
      };
    }
    case "uuid:set": {
      return {
        ...state,
        uuid: action.payload.uuid,
      };
    }
    case "hashedUUID:set": {
      return {
        ...state,
        hashedUUID: action.payload.hashedUUID,
      };
    }
    case "dialog:set": {
      return {
        ...state,
        dialog: action.payload.dialog,
      };
    }
    case "transactionHash:set": {
      return {
        ...state,
        transactionHash: action.payload.transactionHash,
      };
    }
    default:
      return state;
  }
};

export const initialState: CampaignDetailState = {
  campaign: null,
  campaignId: "",
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  isProofPresent: false,
  currentTab: "campaigns",
  distributorAddress: "",
  distributorType: "",
  uuid: "",
  hashedUUID: "",
  dialog: "nothing",
  transactionHash: "",
};
