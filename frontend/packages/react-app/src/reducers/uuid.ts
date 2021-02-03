import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";

export type UUID_ACTIONS =
  | {
      type: "quantity:set";
      payload: { quantity: string };
    }
  | {
      type: "targets:generate";
    }
  | {
      type: "moveToCampaignPage:on";
    }
  | {
      type: "distributorAddress:set";
      payload: {
        distributorAddress: string;
      };
    };

export interface UUIDState {
  quantity: string;
  isValidQuantity: boolean;
  rawTargets: string[];
  targets: string[];
  type: "keccak256";
  moveToCampaignPage: boolean;
  distributorAddress: string;
}

export const uuidReducer = (
  state: UUIDState,
  action: UUID_ACTIONS
): UUIDState => {
  switch (action.type) {
    case "quantity:set": {
      const parsed = Number.parseInt(action.payload.quantity);
      const quantity = isNaN(parsed) ? 0 : parsed;
      return {
        ...state,
        quantity: action.payload.quantity,
        isValidQuantity: quantity > 0,
      };
    }
    case "targets:generate": {
      const quantity = Number.parseInt(state.quantity);
      const rawTargets: string[] = [...Array(quantity)].map(() => uuidv4());
      const targets: string[] = rawTargets.map((uuid) =>
        ethers.utils.solidityKeccak256(["string"], [uuid])
      );
      return {
        ...state,
        rawTargets,
        targets,
      };
    }
    case "moveToCampaignPage:on": {
      return {
        ...state,
        moveToCampaignPage: true,
      };
    }
    case "distributorAddress:set": {
      return {
        ...state,
        distributorAddress: action.payload.distributorAddress,
      };
    }
    default:
      throw new Error();
  }
};

export const uuidInitialState: UUIDState = {
  quantity: "",
  isValidQuantity: false,
  rawTargets: [],
  targets: [],
  type: "keccak256",
  moveToCampaignPage: false,
  distributorAddress: "",
};
