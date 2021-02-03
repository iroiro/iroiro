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

// TODO Update type
import { Web3Provider } from "@ethersproject/providers";

export interface Recipients {
  readonly targets: string[];
  readonly type: string;
}

export interface Web3Props {
  readonly provider: Web3Provider | undefined;
  readonly loadWeb3Modal: () => void;
}

export interface UserToken {
  readonly address: string;
  readonly name: string;
  readonly symbol: string;
  readonly balance: string;
}

export interface AccountToken {
  readonly token?: TokenBasic;
  readonly balance?: string;
  readonly allowance?: string;
}

export interface AccountTokens {
  readonly tokens: AccountToken[];
  readonly checkRequests: CheckRequest[];
}

export interface TokenBalanceUserHolds {
  readonly account: Account;
}

export interface TokenBasic {
  readonly tokenAddress: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly totalSupply: string;
}

export interface Distributor {
  id: string;
  distributorCid: string;
  distributorMetadata: DistributorMetadata;
  type: string;
  version: string;
  disabled: boolean;
}

export interface DistributorMetadata {
  name: string;
  description: string;
  image: string;
}

export interface Creator {
  id: string;
}

export interface Claim {
  readonly id: string;
  readonly account: Account;
  readonly campaign: CampaignInfo;
  readonly token: string;
  readonly amount: string;
}

export interface CheckRequest {
  id: string;
  account: Account;
  campaign: CampaignInfo;
  status: number; // TODO add status type
  result: boolean;
}

export interface CampaignInfo {
  readonly id: string;
  readonly distributor: Distributor;
  readonly token: AccountToken;
  readonly startDate: string;
  readonly endDate: string;
  readonly creator: Creator;
  readonly campaignInfoCid: string;
  readonly recipientsCid: string;
  readonly claimAmount: string;
  readonly claimedNum: string;
  readonly status: number;
  readonly claims: Claim[];
  readonly checkRequests: CheckRequest[];
  readonly campaignMetadata: CampaignMetadata;
  readonly claimed: number;
  readonly merkleRoot: string;
  readonly merkleTreeCid: string;
}

export interface CampaignMetadata {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface Activity {
  name: string;
  timestamp: number;
  amount: string;
}

export interface Balance {
  timestamp: number;
  balance: string;
}

// TODO Move to page reducer
export interface TokenInformationState {
  token?: TokenBasic;
  isTokenApproved: boolean;
  isTokenRequested: boolean;
  isTokenCheckFinished: boolean;
  campaigns: CampaignInfo[];
  campaignAddress?: string;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  userAddress?: string;
  userBalance?: string;
  activities: Activity[];
  balances: Balance[];
  now: Date;
  distributorType: string;
}

export interface Campaigns {
  campaigns: CampaignInfo[];
}

export interface TokenAndCampaignProps {
  readonly tokenState: AccountToken;
  readonly campaignsState: Campaigns;
}

export interface Target {
  readonly handle: string;
  readonly wallet: string;
}

export interface TokenListState {
  isOpen: boolean;
  tokens: TokenBasic[];
  tokenAddress: string;
  inputTokenAddress: string;
  type: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
}

export interface WalletList {
  targets: string[];
  type: string;
  filelist: FileList | null;
  fileformat: boolean;
}
