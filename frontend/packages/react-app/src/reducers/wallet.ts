import { WalletList } from "../interfaces";

export type WALLET_ACTIONS =
  | {
      type: "walletlistFile:upload";
      payload: { walletlistFile: FileList | null };
    }
  | {
      type: "walletlist:set";
      payload: { targets: string[] };
    };

export const walletReducer = (
  state: WalletList,
  action: WALLET_ACTIONS
): WalletList => {
  switch (action.type) {
    case "walletlistFile:upload": {
      if (action.payload.walletlistFile === null) {
        return { ...state };
      }

      return { ...state, filelist: action.payload.walletlistFile };
    }
    case "walletlist:set": {
      return { ...state, targets: action.payload.targets, filelist: null };
    }
    default:
      throw new Error();
  }
};

export const walletInitialState: WalletList = {
  filelist: null,
  targets: [],
  type: "address",
};
