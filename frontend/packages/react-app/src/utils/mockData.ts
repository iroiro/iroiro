import {
  CampaignInfo,
  CampaignMetadata,
  TokenInformationState,
  Target,
  Distributor,
  TokenInfo,
  AccountToken,
} from "../interfaces";
import { TokenListState } from "../reducers/tokens";
import { EventData } from "web3-eth-contract";

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
  campaignInfoCid: "QmYdUkdEgQtn4viySEQie51JAwrC3xTyDqDbdWXWEwAz5J",
  campaignMetadata: {
    name: "Audiusフォロワーさん向けトークン配布キャンペーン！",
    description:
      "Audiusアカウントのフォロワーの方へトークンを配布します。手順はXXX...",
    image: "https://example.com/campaignimage.jpg",
  },
  claimAmount: "0",
  distributor: distributor,
  id: "0xcc22b3199013627708d05fedf9b854bd7706a156",
  startDate: "20201212",
  status: 0,
  claimed: 10,
  token: "",
  endDate: "",
  creator: "",
  recipientsCid: "",
  claimedNum: 100,
  claims: [],
  checkRequests: [],
};

// from: https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#id41
const event: EventData = {
  returnValues: {
    myIndexedParam: 20,
    myOtherIndexedParam: "0x123456789...",
    myNonIndexParam: "My String",
  },
  raw: {
    data:
      "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
    topics: [
      "0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7",
      "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
    ],
  },
  event: "MyEvent",
  signature:
    "0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7",
  logIndex: 0,
  transactionIndex: 0,
  transactionHash:
    "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
  blockHash:
    "0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7",
  blockNumber: 1234,
  address: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
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

export const tokenAddress: string =
  "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

export const tokenState: TokenInfo = {
  token: {
    name: "TestUsdtToken",
    tokenAddress: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
  },
};

export const tokenInfo: AccountToken = {
  token: {
    id: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
    name: "TestUsdtToken",
    symbol: "TUSDT",
    decimals: 18,
  },
  balance: "8888888",
};

export const tokenListState: TokenListState = {
  tokens: [
    {
      tokenAddress: "0xabcd....1234",
      name: "Iroiro Token",
      symbol: "IRO",
      decimals: 8,
      totalSupply: 2000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Storybook Token",
      symbol: "STR",
      decimals: 18,
      totalSupply: 1000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Test Token",
      symbol: "TST",
      decimals: 4,
      totalSupply: 3000000000,
    },
  ],
  isOpen: false,
  inputTokenAddress: "",
  tokenAddress: "",
  type: "dashboard",
  color: "itblue",
};
