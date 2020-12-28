import {
  Activity,
  Balance,
  CampaignInfo,
  CheckRequest,
  Claim,
  TokenBasic,
  TokenInformationState,
} from "../interfaces";
import { BigNumber } from "ethers";
import { LINK_APPROVE_AMOUNT } from "../utils/const";
import { Event } from "@ethersproject/contracts";
import { Block } from "@ethersproject/providers";

export type TokenInformationAction =
  | {
      type: "token:set";
      payload: {
        token: TokenBasic;
      };
    }
  | {
      type: "isTokenApproved:set";
      payload: {
        allowance: BigNumber;
      };
    }
  | {
      type: "isTokenApproved:setTrue";
    }
  | {
      type: "isTokenRequested:setTrue";
    }
  | {
      type: "isTokenCheckFinished:setTrue";
    }
  | {
      type: "isTokenCheckFinished:set";
      payload: {
        checkRequests: CheckRequest[] | undefined;
      };
    }
  | {
      type: "isTokenCheckFinished:remove";
    }
  | {
      type: "campaigns:set";
      payload: {
        campaigns: CampaignInfo[];
      };
    }
  | {
      type: "campaignAddress:set";
      payload: {
        campaignAddress: string;
      };
    }
  | {
      type: "campaignAddress:remove";
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
      type: "isCampaignClaimed:set";
      payload: {
        claim: Claim;
      };
    }
  | {
      type: "isCampaignClaimed:remove";
    }
  | {
      type: "userAddress:set";
      payload: {
        address: string;
      };
    }
  | {
      type: "userBalance:set";
      payload: {
        balance: string;
      };
    }
  // TODO: Add claims activities
  | {
      type: "activities:setTransfers";
      payload: {
        eventBlockPairs: {
          event: Event;
          block: Block;
        }[];
      };
    }
  | {
      type: "balances:set";
      payload: {
        walletAddress: string;
        eventBlockPairs: {
          event: Event;
          block: Block;
        }[];
      };
    };

export const tokenInformationReducer = (
  state: TokenInformationState,
  action: TokenInformationAction
): TokenInformationState => {
  switch (action.type) {
    case "token:set":
      return {
        ...state,
        token: {
          ...action.payload.token,
        },
      };
    case "isTokenApproved:set": {
      const isTokenApproved = action.payload.allowance.gte(
        BigNumber.from(LINK_APPROVE_AMOUNT)
      );
      return {
        ...state,
        isTokenApproved,
      };
    }
    case "isTokenApproved:setTrue": {
      return {
        ...state,
        isTokenApproved: true,
      };
    }
    case "isTokenRequested:setTrue": {
      return {
        ...state,
        isTokenRequested: true,
      };
    }
    case "isTokenCheckFinished:setTrue": {
      return {
        ...state,
        isTokenCheckFinished: true,
      };
    }
    case "isTokenCheckFinished:set": {
      if (!action.payload.checkRequests) {
        return state;
      }
      const isTokenCheckFinished =
        action.payload.checkRequests.filter((req) => req.status !== 0).length >
        0;
      return {
        ...state,
        isTokenCheckFinished,
      };
    }
    case "isTokenCheckFinished:remove": {
      return {
        ...state,
        isTokenCheckFinished: false,
      };
    }
    case "campaigns:set":
      return {
        ...state,
        campaigns: action.payload.campaigns,
      };
    case "campaignAddress:set":
      return {
        ...state,
        campaignAddress: action.payload.campaignAddress,
      };
    case "campaignAddress:remove":
      return {
        ...state,
        campaignAddress: undefined,
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
    case "userAddress:set":
      return {
        ...state,
        userAddress: action.payload.address,
      };
    case "userBalance:set":
      return {
        ...state,
        userBalance: action.payload.balance,
      };
    case "activities:setTransfers": {
      if (state.userAddress === undefined) {
        return state;
      }
      const activities: Activity[] = action.payload.eventBlockPairs
        .sort((a, b) => {
          return a.block.timestamp - b.block.timestamp;
        })
        .map((pair) => {
          const name =
            pair.event?.args?.["to"] === state.userAddress
              ? "Receive"
              : "Transfer";
          return {
            name,
            timestamp: pair.block.timestamp * 1000,
            amount: pair.event?.args?.["value"].toString(),
          };
        });
      return {
        ...state,
        activities,
      };
    }
    case "balances:set": {
      const balances: {
        timestamp: number;
        balance: BigNumber;
      }[] = action.payload.eventBlockPairs
        .sort((a, b) => {
          return a.block.timestamp - b.block.timestamp;
        })
        .map((pair) => {
          const rawAmount: BigNumber =
            pair.event?.args?.["value"] ?? BigNumber.from("0");
          const amount =
            pair.event?.args?.["to"] === action.payload.walletAddress
              ? rawAmount
              : rawAmount.mul(-1);
          return {
            timestamp: pair.block.timestamp * 1000,
            balance: amount,
          };
        });
      const reducedBalances: Balance[] = balances
        .map((balance, index) =>
          balances.slice(0, index + 1).reduce((a, b) => {
            return {
              timestamp: b.timestamp,
              balance: a.balance.add(b.balance),
            };
          })
        )
        .map((balance) => {
          return {
            timestamp: balance.timestamp,
            balance: balance.balance.toString(),
          };
        });
      return {
        ...state,
        balances: reducedBalances,
      };
    }
    default:
      return state;
  }
};

export const initialState: TokenInformationState = {
  token: undefined,
  isTokenApproved: false,
  isTokenRequested: false,
  isTokenCheckFinished: false,
  campaigns: [],
  campaignAddress: undefined,
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  userAddress: undefined,
  userBalance: undefined,
  activities: [],
  balances: [],
  now: new Date(),
};
