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

export type ACTIONS =
  | {
      type: "startExecution:result";
      payload: { executionArn: string };
    }
  | {
      type: "merkleroot:set";
      payload: { merkleRoot: string; merkleTreeCid: string };
    }
  | {
      type: "describeStatus:update";
      payload: { status: string };
    };

export interface MerkltreeData {
  executionArn: string;
  status: string;
  merkleRoot: string;
  merkleTreeCid: string;
}

export const merkletreeReducer = (
  state: MerkltreeData,
  action: ACTIONS
): MerkltreeData => {
  switch (action.type) {
    case "startExecution:result":
      return {
        ...state,
        executionArn: action.payload.executionArn,
      };
    case "merkleroot:set":
      return {
        ...state,
        merkleRoot: action.payload.merkleRoot,
        merkleTreeCid: action.payload.merkleTreeCid,
        status: "SUCCEEDED",
      };
    case "describeStatus:update":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const merkltreeInitialState: MerkltreeData = {
  executionArn: "",
  status: "",
  merkleRoot: "",
  merkleTreeCid: "",
};
