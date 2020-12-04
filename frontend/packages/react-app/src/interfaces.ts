// TODO Update type
import { Web3Provider } from "@ethersproject/providers";
import { EventData } from "web3-eth-contract";

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
  // TODO Add fields
}

export interface Creator {
  // TODO Add fields
}

export interface Claim {
  // TODO Add fields
}

export interface CheckRequest {
  // TODO Add fields
}

export interface Campaign {
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
}

export interface CampaignInformation {
  readonly address: string;
  readonly name: string;
  readonly description: string;
  readonly image?: string;
}

export interface Activity {
  name: string;
  timestamp: string;
  amount: string;
}

// TODO Move to page reducer
export interface TokenInformationState {
  token?: TokenBasic;
  campaigns: Campaign[];
  campaignInformationList: CampaignInformation[];
  campaignAddress?: string;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  userAddress?: string;
  userBalance?: string;
  activities: Activity[];
  // TODO: define with chart
  // balances: Balances[];
}
