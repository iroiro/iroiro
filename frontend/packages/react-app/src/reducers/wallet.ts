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

import { WalletList } from "../interfaces";

export type WALLET_ACTIONS =
  | {
      type: "walletlistFile:upload";
      payload: { walletlistFile: FileList | null };
    }
  | {
      type: "walletlist:set";
      payload: { targets: string[] };
    }
  | { type: "fileformat:set"; payload: { status: boolean } };

export const walletReducer = (
  state: WalletList,
  action: WALLET_ACTIONS
): WalletList => {
  switch (action.type) {
    case "walletlistFile:upload": {
      if (action.payload.walletlistFile === null) {
        return { ...state };
      }
      return {
        ...state,
        filelist: action.payload.walletlistFile,
      };
    }
    case "walletlist:set": {
      const lowerCasedTargets = action.payload.targets.map((target) =>
        target.toLowerCase()
      );
      const uniqueTargets = Array.from(new Set(lowerCasedTargets));
      const duplicated = lowerCasedTargets.length - uniqueTargets.length;
      return {
        ...state,
        targets: uniqueTargets,
        duplicated,
        filelist: null,
        fileformat: true,
      };
    }
    case "fileformat:set": {
      return { ...state, fileformat: action.payload.status };
    }
    default:
      throw new Error();
  }
};

export const walletInitialState: WalletList = {
  filelist: null,
  fileformat: true,
  targets: [],
  duplicated: 0,
  type: "address",
};
