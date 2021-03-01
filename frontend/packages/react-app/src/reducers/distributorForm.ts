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

import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
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
  | { type: "startDate:set"; payload: { startDate: MaterialUiPickersDate } }
  | { type: "endDate:set"; payload: { endDate: MaterialUiPickersDate } }
  | { type: "token:approve"; payload: { approveRequest: boolean } }
  | {
      type: "campaign:deploy";
      payload: { requestDeployCampaign: boolean };
    }
  | { type: "createdCampaignAddress:set"; payload: { address: string } }
  | { type: "tokenAddress:set"; payload: { tokenAddress: string } }
  | { type: "dialog:set"; payload: { dialog: DialogStatus } };

type DialogStatus =
  | "nothing"
  | "approving-token"
  | "waiting-api"
  | "creating-campaign";

export interface createCampaignState {
  step: number;
  approveAmount: string;
  campaignName: string;
  campaignDescription: string;
  startDate: number;
  endDate: number;
  approveRequest: boolean;
  requestDeployCampaign: boolean;
  createdCampaignAddress: string;
  tokenAddress: string;
  distributorType: DistributorTypes | "";
  dialog: DialogStatus;
}

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
      return { ...state, campaignName: action.payload.campaignName };
    }
    case "campaignDescription:set": {
      return {
        ...state,
        campaignDescription: action.payload.campaignDescription,
      };
    }
    case "startDate:set": {
      const startDate = Number(action.payload.startDate);
      return { ...state, startDate: startDate };
    }
    case "endDate:set": {
      const endDate = Number(action.payload.endDate);
      return { ...state, endDate: endDate };
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
    case "createdCampaignAddress:set": {
      return { ...state, createdCampaignAddress: action.payload.address };
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

const startDate = new Date();
startDate.setHours(0, 0, 0, 0);
const endDate = new Date();
endDate.setHours(0, 0, 0, 0);
endDate.setDate(startDate.getDate() + 1);

export const distributorFormInitialState: createCampaignState = {
  step: 0,
  approveAmount: "0",
  campaignName: "",
  campaignDescription: "",
  startDate: startDate.getTime(),
  endDate: endDate.getTime(),
  approveRequest: false,
  requestDeployCampaign: false,
  createdCampaignAddress: "",
  tokenAddress: "",
  distributorType: "",
  dialog: "nothing",
};
