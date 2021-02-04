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

import { Activity, Balance } from "../interfaces";
import { BigNumber } from "ethers";
import { Event } from "@ethersproject/contracts";
import { Block } from "@ethersproject/providers";

export interface TokenHistoryState {
  userAddress?: string;
  activities: Activity[];
  balances: Balance[];
}

export type TokenHistoryAction =
  | {
      type: "userAddress:set";
      payload: {
        address: string;
      };
    }
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

export const tokenHistoryReducer = (
  state: TokenHistoryState,
  action: TokenHistoryAction
): TokenHistoryState => {
  switch (action.type) {
    case "userAddress:set":
      return {
        ...state,
        userAddress: action.payload.address,
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
  }
};

export const initialState: TokenHistoryState = {
  userAddress: "",
  activities: [],
  balances: [],
};
