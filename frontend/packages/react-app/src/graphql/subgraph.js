/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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

// TODO add pagination
export const GET_CAMPAIGNS = gql`
  query getCampaigns($token: String, $distributorNot: String, $first: Int) {
    campaigns(
      where: { token: $token, distributor_not: $distributorNot }
      first: $first
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      token
      distributor {
        id
      }
      campaignInfoCid
      merkleRoot
      merkleTreeCid
      creator {
        id
      }
    }
  }
`;

export const GET_USER_CLAIMED_CAMPAIGNS = gql`
  query getUserClaimedCampaigns($account: String!, $token: String) {
    claims(
      where: { account: $account, token: $token }
      orderBy: createdAt
      orderDirection: desc
    ) {
      campaign {
        id
        token
        distributor {
          id
        }
        campaignInfoCid
        merkleRoot
        merkleTreeCid
        creator {
          id
        }
      }
    }
  }
`;

export const GET_CAMPAIGNS_BY_CREATOR = gql`
  query getCampaignsByCreator($creator: ID!) {
    campaigns(where: { creator: $creator, token_not: null }) {
      id
      token
      distributor {
        id
      }
      campaignInfoCid
    }
  }
`;

export const GET_NFT_CAMPAIGNS_BY_CREATOR = gql`
  query getNFTCampaignsByCreator($creator: ID!) {
    campaigns(where: { creator: $creator, token: null }) {
      id
      distributor {
        id
      }
      campaignInfoCid
    }
  }
`;

export const GET_CAMPAIGNS_BY_CREATOR_AND_TOKEN = gql`
  query getCampaignsByCreatorAndToken($creator: ID!, $token: String!) {
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
    }
  }
`;

export const GET_CAMPAIGN = gql`
  query getCampaign($id: ID!, $account: String) {
    campaign(id: $id) {
      id
      token
      distributor {
        id
      }
      campaignInfoCid
      claimedNum
      merkleRoot
      merkleTreeCid
      claims(where: { account: $account }) {
        id
      }
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

export const GET_TOKEN_LIST = gql`
  {
    campaigns(
      where: { token_not: "0xa2dfdeac7b4456b0a44f36f6111218688d9b1c7a" }
    ) {
      token
    }
  }
`;
