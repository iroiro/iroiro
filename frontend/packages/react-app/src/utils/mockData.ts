import {
  CampaignInfo,
  CampaignMetadata,
  TokenInformationState,
} from "../interfaces";

export const campaignMetadata: CampaignMetadata = {
  name: "A Campaign",
  description: "This is a test campaign",
  image: "",
};

export const campaign: CampaignInfo = {
  id: "0xcampaign...1234",
  distributor: {
    id: "0xdistributor...1234",
  },
  token: "0xtoken...1234",
  startDate: "1612137600",
  endDate: "1612137600",
  creator: {},
  campaignInfoCid: "cid",
  recipientsCid: "",
  claimAmount: "100",
  claimedNum: 10,
  status: 0,
  claims: [],
  checkRequests: [],
  campaignMetadata: campaignMetadata,
};

export const tokenInformationState: TokenInformationState = {
  token: {
    tokenAddress: "0xabcd...1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 18,
    totalSupply: 2000000000,
  },
  isTokenApproved: true,
  isTokenRequested: false,
  campaigns: [
    campaign,
    {
      ...campaign,
      status: 1,
    },
    {
      ...campaign,
      status: 2,
    },
  ],
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  userAddress: "0x0000000000000000000000000000000000000000",
  userBalance: "1234500000",
  campaignAddress: "0xcampaign...1234",
  activities: [
    {
      name: "Claim",
      timestamp: "1612137600",
      amount: "100",
    },
    {
      name: "Donate",
      timestamp: "1612137600",
      amount: "200",
    },
    {
      name: "Transfer",
      timestamp: "1612137600",
      amount: "300",
    },
  ],
  balances: [
    {
      timestamp: 1577836800000,
      balance: "100",
    },
    {
      timestamp: 1580515200000,
      balance: "200",
    },
    {
      timestamp: 1583020800000,
      balance: "300",
    },
    {
      timestamp: 1585699200000,
      balance: "400",
    },
    {
      timestamp: 1588291200000,
      balance: "300",
    },
  ],
};
