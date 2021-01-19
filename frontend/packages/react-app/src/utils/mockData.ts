import {
  CampaignInfo,
  CampaignMetadata,
  TokenInformationState,
  Target,
  Distributor,
  AccountToken,
  TokenListState,
} from "../interfaces";
import { createCampaignState } from "../reducers/distributorForm";
import { AudiusState } from "../reducers/audius";

export const campaignMetadata: CampaignMetadata = {
  name: "A Campaign",
  description: "This is a test campaign",
  image: "",
};

export const distributor: Distributor = {
  id: "0x48889feca4574810e5a5b30b6b93146a837500fb",
  distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
  distributorMetadata: {
    name: "Audius Followers Distributor",
    description:
      "This distributer enables creators to distributes tokens for their followers on Auduis.",
    image: "https://example.com/distributerimage.jpg",
  },
  depositAmount: "100000",
};

export const campaign: CampaignInfo = {
  id: "0xcc22b3199013627708d05fedf9b854bd7706a156",
  campaignInfoCid: "QmYdUkdEgQtn4viySEQie51JAwrC3xTyDqDbdWXWEwAz5J",
  campaignMetadata: {
    name: "Audiusフォロワーさん向けトークン配布キャンペーン！",
    description:
      "Audiusアカウントのフォロワーの方へトークンを配布します。手順はXXX...",
    image: "https://example.com/campaignimage.jpg",
  },
  claimAmount: "10",
  distributor: distributor,
  startDate: "1606780800",
  status: 0,
  claimed: 10,
  token: {
    token: {
      tokenAddress: "",
      name: "",
      symbol: "",
      decimals: 18,
      totalSupply: "",
    },
    balance: "",
  },
  endDate: "1612137600",
  creator: {
    id: "",
  },
  recipientsCid: "",
  claimedNum: "100",
  claims: [],
  checkRequests: [],
};

export const tokenInformationState: TokenInformationState = {
  token: {
    tokenAddress: "0xabcd...1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 5,
    totalSupply: "2000000000",
  },
  isTokenApproved: false,
  isTokenRequested: false,
  isTokenCheckFinished: false, // TODO: Replace with subgraph response
  campaigns: [
    {
      ...campaign,
      creator: {
        id: "0x0000000000000000000000000000000000000001"
      }
    },
    {
      ...campaign,
      status: 1,
      creator: {
        id: "0x0000000000000000000000000000000000000002"
      }
    },
    {
      ...campaign,
      status: 2,
      creator: {
        id: "0x0000000000000000000000000000000000000003"
      }
    },
  ],
  isCampaignClaimable: false,
  isCampaignClaimed: false,
  userAddress: "0x0000000000000000000000000000000000000000",
  userBalance: "1234500000000000000000000",
  campaignAddress: "0xcc22b3199013627708d05fedf9b854bd7706a156",
  activities: [
    {
      name: "Claim",
      timestamp: 1612137600000,
      amount: "100",
    },
    {
      name: "Donate",
      timestamp: 1612137600000,
      amount: "200",
    },
    {
      name: "Transfer",
      timestamp: 1612137600000,
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
  now: new Date(),
};

export const distributionTargets: Target[] = [
  {
    handle: "sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "username sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "sample",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "username sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
  {
    handle: "sample user",
    wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
  },
];

export const tokenAddress = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

// export const tokenState: TokenInfo = {
//   token: {
//     name: "TestUsdtToken",
//     tokenAddress: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
//   },
// };

export const tokenInfo: AccountToken = {
  token: {
    tokenAddress: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
    name: "TestUsdtToken",
    symbol: "TUSDT",
    decimals: 18,
    totalSupply: "1000000000",
  },
  balance: "8888888",
  allowance: "0",
};

export const tokenListState: TokenListState = {
  tokens: [
    {
      tokenAddress: "0x9AF70Ab10f94fEAF59B00B2cC20C7AE57e21954e",
      name: "Iroiro Token",
      symbol: "IRO",
      decimals: 8,
      totalSupply: "2000000000",
    },
    {
      tokenAddress: "0x9AF70Ab10f94fEAF59B00B2cC20C7AE57e21954e",
      name: "Storybook Token",
      symbol: "STR",
      decimals: 18,
      totalSupply: "1000000000",
    },
    {
      tokenAddress: "0x9AF70Ab10f94fEAF59B00B2cC20C7AE57e21954e",
      name: "Test Token",
      symbol: "TST",
      decimals: 4,
      totalSupply: "3000000000",
    },
  ],
  isOpen: false,
  inputTokenAddress: "",
  tokenAddress: "0x9AF70Ab10f94fEAF59B00B2cC20C7AE57e21954e",
  type: "dashboard",
  color: "secondary",
};

export const distributorFormState: createCampaignState = {
  step: 1,
  approveAmount: "10000",
  campaignName: "Audius Followers Campaign",
  startDate: new Date("2021-01-01T00:00:00").getTime(),
  endDate: new Date("2021-01-01T00:00:00").getTime(),
  approveRequest: false,
  requestDeployCampaign: false,
};

export const audiusTarget: Target = {
  handle: "handlename",
  wallet: "0x0000000000000000000000000000000000000000",
};

export const audiusState: AudiusState = {
  email: "sample@example.com",
  password: "samplepassword",
  followers: [
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
    audiusTarget,
  ],
  followersCount: 10000,
  isSignin: true,
  requestSignin: true,
  libs: {},
  user: {},
  isRequestFollowers: false,
  isRequestSignout: false,
  progress: 0,
};
