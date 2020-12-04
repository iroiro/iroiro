import { Campaign, TokenInformationState } from "../interfaces";

export const campaign: Campaign = {
  id: "0xcampaign...1234",
  distributor: {},
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
};

export const campaignInformation = {
  address: "0xcampaign...1234",
  name: "A Campaign",
  description: "This is a test campaign",
  image: "",
};

export const tokenInformationState: TokenInformationState = {
  token: {
    tokenAddress: "0xabcd...1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 18,
    totalSupply: 2000000000,
  },
  campaigns: [campaign, campaign, campaign],
  campaignInformationList: [
    campaignInformation,
    campaignInformation,
    campaignInformation,
  ],
  userBalance: "1234500000",
  campaignAddress: "0xcampaign...1234",
};
