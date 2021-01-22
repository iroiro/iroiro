import { gql } from "apollo-boost";

export const GET_TOKENS = gql`
  {
    tokens {
      id
    }
  }
`;

// Pass id as lower case string, subgraph id is case sensitive
export const GET_TOKENS_BALANCE_USER_HOLDS = gql`
  query getTokensBalanceUserHolds($id: ID!) {
    account(id: $id) {
      tokens {
        id
        balance
        token {
          id
          name
          symbol
          decimals
        }
      }
    }
  }
`;

export const GET_CREATOR_TOKENS = gql`
  query getCreatorTokens($id: ID!) {
    creator(id: $id) {
      id
      tokens {
        id
        name
        symbol
        decimals
        totalSupply
        creatorTokenRatio
        enableStakeToToken
      }
    }
  }
`;

export const GET_ACCOUNT_TOKEN = gql`
  query getAccountToken($id: ID!) {
    accountToken(id: $id) {
      id
      balance
      token {
        id
        name
        symbol
        totalSupply
        decimals
        creatorTokenRatio
        lockupPeriod
      }
    }
  }
`;

export const GET_CAMPAIGNS = gql`
  query getCampaigns($creator: ID!, $token: String!) {
    campaigns(where: { creator: $creator, token: $token }) {
      id
      token
      distributor {
        id
      }
      campaignInfoCid
      startDate
      endDate
      claimAmount
      status
      merkleRoot
      merkleTreeCid
    }
  }
`;

export const GET_CAMPAIGN = gql`
  query getCampaign($id: ID!) {
    campaign(id: $id) {
      token
      distributor {
        id
      }
      campaignInfoCid
      recipientsCid
      startDate
      endDate
      claimAmount
      claimedNum
      status
    }
  }
`;

export const GET_DISTRIBUTORS = gql`
  {
    distributors {
      id
      distributorCid
    }
  }
`;

export const GET_CHECK_REQUEST = gql`
  query getCheckRequest($account: String!, $campaign: String!) {
    checkRequests(where: { account: $account, campaign: $campaign }) {
      id
      account {
        id
      }
      result
      status
    }
  }
`;

export const GET_CLAIM = gql`
  query getClaim($id: ID!) {
    claim(id: $id) {
      id
      account {
        id
      }
      campaign {
        id
      }
      token
      amount
    }
  }
`;
