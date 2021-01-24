import { CampaignInfo, TokenBasic } from "../interfaces";

export interface CampaignDetails {
  token?: TokenBasic;
  userAddress?: string;
  userBalance?: string;
  isTokenRequested: boolean;
  isTokenCheckFinished: boolean;
  campaign: CampaignInfo;
  isCampaignClaimable: boolean;
  isCampaignClaimed: boolean;
  now: Date;
}

