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

export interface Token {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
}

export interface AccountToken {
  readonly token: Token;
  readonly balance: string;
}

export interface Account {
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
  readonly totalSupply: number;
}

export interface Distributor {
  id: string;
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
  readonly token: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly creator: Creator;
  readonly campaignInfoCid: string;
  readonly recipientsCid: string;
  readonly claimAmount: string;
  readonly claimedNum: number;
  readonly status: number;
  readonly claims: Claim[];
  readonly checkRequests: CheckRequest[];
  readonly campaignMetadata: CampaignMetadata;
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
  campaigns: CampaignInfo[];
  campaignAddress?: string;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  userAddress?: string;
  userBalance?: string;
  activities: Activity[];
  balances: Balance[];
}

export interface TokenInfo {
  token: {
    name: string;
    tokenAddress: string;
  };
}

export interface TokenAndCampaignProps {
  readonly tokenState: TokenInfo;
  readonly campaignsState: CampaignInfo[];
}

export interface Distributor {
  id: string;
  distributorCid: string;
  distributorMetadata: DistributorMetadata;
}

export interface DistributorMetadata {
  name: string;
  description: string;
  image: string;
}
