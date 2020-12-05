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

export interface CampaignInfo {
  claimAmount: string;
  distributor: {
    id: string;
  };
  id: string;
  status: Number;
  campaignInfoCid: string;
  campaignMetadata: CampaignMetadata;
  startDate: string;
}

export interface CampaignMetadata {
  name: string;
  description: string;
  image: string;
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

export interface Target {
  readonly handle: string;
  readonly wallet: string;
}
