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

import { CampaignInfo, Campaigns } from "../interfaces";

export type ACTIONS =
  | {
      type: "campaign:get";
      payload: { data: CampaignInfo[] };
    }
  | {
      type: "campaignMetadata:set";
      payload: { data: CampaignInfo[] };
    };

export const campaignsReducer = (
  state: Campaigns,
  action: ACTIONS
): Campaigns => {
  switch (action.type) {
    case "campaign:get":
      if (action.payload.data.length < 0) {
        return state;
      }
      return { ...state, campaigns: action.payload.data };
    case "campaignMetadata:set":
      return { ...state, campaigns: action.payload.data };
    default:
      return state;
  }
};

export const campaignsInitialState = {
  campaigns: new Array<CampaignInfo>(),
};
