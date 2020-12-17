// TODO Update type
import { Web3Provider } from "@ethersproject/providers";

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
  depositAmount: string;
  distributorCid: string;
  distributorMetadata: DistributorMetadata;
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
  id: string;
}

export interface CheckRequest {
  id: string;
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
}

export interface CampaignMetadata {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface Activity {
  name: string;
  timestamp: string;
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
}

export interface TokenAndCampaignProps {
  readonly tokenState: AccountToken;
  readonly campaignsState: CampaignInfo[];
}

export interface Target {
  readonly handle: string;
  readonly wallet: string;
}
