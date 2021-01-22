import { WalletListState } from "../interfaces";

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
  state: WalletListState,
  action: WALLET_ACTIONS
): WalletListState => {
  switch (action.type) {
    case "walletlistFile:upload": {
      if (action.payload.walletlistFile === null) {
        return { ...state };
      }

      return { ...state, filelist: action.payload.walletlistFile };
    }
    case "walletlist:set": {
      return { ...state, targets: action.payload.targets };
    }
    default:
      throw new Error();
  }
};

export const walletInitialState: WalletListState = {
  filelist: null,
  targets: [],
  type: "address",
};
