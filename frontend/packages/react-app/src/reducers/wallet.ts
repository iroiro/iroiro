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
      return {
        ...state,
        targets: action.payload.targets,
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
  type: "address",
};
