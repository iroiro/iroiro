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

import { DistributorTypes } from "../interfaces";

export type DISTRIBUTOR_ACTIONS =
  | {
      type: "step:set";
      payload: { stepNo: number };
    }
  | {
      type: "approveAmount:set";
      payload: { approveAmount: string };
    }
  | { type: "campaignName:set"; payload: { campaignName: string } }
  | {
      type: "campaignDescription:set";
      payload: { campaignDescription: string };
    }
  | { type: "campaignImageFile:set"; payload: { campaignImageFile: File } }
  | {
      type: "campaignImagePreview:set";
      payload: { campaignImagePreview: string };
    }
  | { type: "token:approve"; payload: { approveRequest: boolean } }
  | {
      type: "campaign:deploy";
      payload: { requestDeployCampaign: boolean };
    }
  | { type: "createdCampaignId:set"; payload: { campaignId: string } }
  | { type: "tokenAddress:set"; payload: { tokenAddress: string } }
  | { type: "dialog:set"; payload: { dialog: DialogStatus } };

export type DialogStatus =
  | "nothing"
  | "claim"
  | "approving-token"
  | "waiting-api"
  | "creating-campaign";

export interface createCampaignState {
  step: number;
  approveAmount: string;
  campaignName: string;
  campaignDescription: string;
  campaignImageFile?: File;
  campaignImagePreview: string;
  approveRequest: boolean;
  requestDeployCampaign: boolean;
  createdCampaignId: string;
  tokenAddress: string;
  distributorType: DistributorTypes | "";
  dialog: DialogStatus;
  isAbleToStartCampaign: boolean;
}

const judgeIsAbleToStartCampaign = (
  distributorType: DistributorTypes | "",
  campaignName: string,
  campaignImageFile?: File
): boolean => {
  if (campaignName === "") {
    return false;
  }
  switch (distributorType) {
    case "wallet-nft":
    case "uuid-nft":
    case "email-nft": {
      return campaignImageFile !== undefined;
    }
    default:
      return true;
  }
};

export const distributorFormReducer = (
  state: createCampaignState,
  action: DISTRIBUTOR_ACTIONS
): createCampaignState => {
  switch (action.type) {
    case "step:set": {
      return { ...state, step: action.payload.stepNo };
    }
    case "approveAmount:set": {
      return {
        ...state,
        approveAmount: action.payload.approveAmount,
        approveRequest: false,
      };
    }
    case "campaignName:set": {
      const newState = {
        ...state,
        campaignName: action.payload.campaignName,
      };
      return {
        ...newState,
        isAbleToStartCampaign: judgeIsAbleToStartCampaign(
          newState.distributorType,
          newState.campaignName,
          newState.campaignImageFile
        ),
      };
    }
    case "campaignDescription:set": {
      return {
        ...state,
        campaignDescription: action.payload.campaignDescription,
      };
    }
    case "campaignImageFile:set": {
      const newState = {
        ...state,
        campaignImageFile: action.payload.campaignImageFile,
      };
      return {
        ...newState,
        isAbleToStartCampaign: judgeIsAbleToStartCampaign(
          newState.distributorType,
          newState.campaignName,
          newState.campaignImageFile
        ),
      };
    }
    case "campaignImagePreview:set": {
      return {
        ...state,
        campaignImagePreview: action.payload.campaignImagePreview,
      };
    }
    case "token:approve": {
      return { ...state, approveRequest: action.payload.approveRequest };
    }
    case "campaign:deploy": {
      return {
        ...state,
        requestDeployCampaign: action.payload.requestDeployCampaign,
      };
    }
    case "createdCampaignId:set": {
      return { ...state, createdCampaignId: action.payload.campaignId };
    }
    case "tokenAddress:set": {
      return { ...state, tokenAddress: action.payload.tokenAddress };
    }
    case "dialog:set": {
      return { ...state, dialog: action.payload.dialog };
    }
    default:
      throw new Error();
  }
};

export const distributorFormInitialState: createCampaignState = {
  step: 0,
  approveAmount: "0",
  campaignName: "",
  campaignDescription: "",
  campaignImageFile: undefined,
  campaignImagePreview: "",
  approveRequest: false,
  requestDeployCampaign: false,
  createdCampaignId: "",
  tokenAddress: "",
  distributorType: "",
  dialog: "nothing",
  isAbleToStartCampaign: false,
};
