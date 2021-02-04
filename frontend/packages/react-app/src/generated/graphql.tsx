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

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: string;
  Bytes: string;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  tokens: Array<AccountToken>;
  checkRequests: Array<CheckRequest>;
  claims: Array<Claim>;
};

export type AccountToken = {
  __typename?: 'AccountToken';
  id: Scalars['ID'];
  account: Account;
  balance: Scalars['BigInt'];
  token: Token;
};



export type Campaign = {
  __typename?: 'Campaign';
  id: Scalars['ID'];
  distributor: Distributor;
  token: Scalars['String'];
  startDate?: Maybe<Scalars['BigInt']>;
  endDate?: Maybe<Scalars['BigInt']>;
  /** Campaign creator not only token creator */
  creator: Creator;
  campaignInfoCid?: Maybe<Scalars['String']>;
  recipientsCid?: Maybe<Scalars['String']>;
  merkleTreeCid?: Maybe<Scalars['String']>;
  merkleRoot?: Maybe<Scalars['Bytes']>;
  claimAmount?: Maybe<Scalars['BigInt']>;
  claimedNum?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Scalars['Int']>;
  claims: Array<Claim>;
  checkRequests: Array<CheckRequest>;
};

export type CampaignsCondition = {
  token: Scalars['String'];
};

export type CheckRequest = {
  __typename?: 'CheckRequest';
  /**  Equals to: <campaignAddress>-<requestId> */
  id: Scalars['ID'];
  account: Account;
  campaign: Campaign;
  status: CheckRequestStatus;
  /** Show result only for requested address, not only for other addresses */
  result?: Maybe<Scalars['Boolean']>;
};

export type CheckRequestsCondition = {
  account: Scalars['String'];
  campaign: Scalars['String'];
};

export enum CheckRequestStatus {
  InProgress = 'IN_PROGRESS',
  Fulfilled = 'FULFILLED',
  Cancelled = 'CANCELLED'
}

export type Claim = {
  __typename?: 'Claim';
  /**  Equals to: <accountAddress>-<campaignAddress> */
  id: Scalars['ID'];
  account: Account;
  campaign: Campaign;
  token: Scalars['String'];
  amount?: Maybe<Scalars['BigInt']>;
};

export type Creator = {
  __typename?: 'Creator';
  id: Scalars['ID'];
  tokens: Array<Token>;
  campaigns: Array<Campaign>;
};

export type Distributor = {
  __typename?: 'Distributor';
  id: Scalars['ID'];
  distributorCid?: Maybe<Scalars['String']>;
  campaigns: Array<Campaign>;
};

export type Donate = {
  __typename?: 'Donate';
  /**  Equals to: <accountAddress>-<timestamp> */
  id: Scalars['ID'];
  from: Account;
  to: Creator;
  token: Scalars['String'];
  amount: Scalars['BigInt'];
};

export type Query = {
  __typename?: 'Query';
  tokens: Array<Token>;
  account?: Maybe<Account>;
  creator?: Maybe<Creator>;
  accountToken?: Maybe<AccountToken>;
  campaigns: Array<Campaign>;
  campaign?: Maybe<Campaign>;
  distributors: Array<Distributor>;
  checkRequests: Array<CheckRequest>;
  claim?: Maybe<Claim>;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryCreatorArgs = {
  id: Scalars['ID'];
};


export type QueryAccountTokenArgs = {
  id: Scalars['ID'];
};


export type QueryCampaignsArgs = {
  where: CampaignsCondition;
};


export type QueryCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryCheckRequestsArgs = {
  where: CheckRequestsCondition;
};


export type QueryClaimArgs = {
  id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID'];
  creator: Creator;
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['BigInt'];
  decimals?: Maybe<Scalars['Int']>;
  creatorTokenRatio?: Maybe<Scalars['Int']>;
  isTotalSupplyFixed?: Maybe<Scalars['Boolean']>;
  lockupPeriod?: Maybe<Scalars['Int']>;
  enableStakeToToken?: Maybe<Scalars['Boolean']>;
  accountTokens: Array<AccountToken>;
};


export const GetTokensDocument = gql`
    query getTokens {
  tokens {
    id
  }
}
    `;

/**
 * __useGetTokensQuery__
 *
 * To run a query within a React component, call `useGetTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokensQuery(baseOptions?: Apollo.QueryHookOptions<GetTokensQuery, GetTokensQueryVariables>) {
        return Apollo.useQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, baseOptions);
      }
export function useGetTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokensQuery, GetTokensQueryVariables>) {
          return Apollo.useLazyQuery<GetTokensQuery, GetTokensQueryVariables>(GetTokensDocument, baseOptions);
        }
export type GetTokensQueryHookResult = ReturnType<typeof useGetTokensQuery>;
export type GetTokensLazyQueryHookResult = ReturnType<typeof useGetTokensLazyQuery>;
export type GetTokensQueryResult = Apollo.QueryResult<GetTokensQuery, GetTokensQueryVariables>;
export const GetTokensBalanceUserHoldsDocument = gql`
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

/**
 * __useGetTokensBalanceUserHoldsQuery__
 *
 * To run a query within a React component, call `useGetTokensBalanceUserHoldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensBalanceUserHoldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensBalanceUserHoldsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTokensBalanceUserHoldsQuery(baseOptions: Apollo.QueryHookOptions<GetTokensBalanceUserHoldsQuery, GetTokensBalanceUserHoldsQueryVariables>) {
        return Apollo.useQuery<GetTokensBalanceUserHoldsQuery, GetTokensBalanceUserHoldsQueryVariables>(GetTokensBalanceUserHoldsDocument, baseOptions);
      }
export function useGetTokensBalanceUserHoldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokensBalanceUserHoldsQuery, GetTokensBalanceUserHoldsQueryVariables>) {
          return Apollo.useLazyQuery<GetTokensBalanceUserHoldsQuery, GetTokensBalanceUserHoldsQueryVariables>(GetTokensBalanceUserHoldsDocument, baseOptions);
        }
export type GetTokensBalanceUserHoldsQueryHookResult = ReturnType<typeof useGetTokensBalanceUserHoldsQuery>;
export type GetTokensBalanceUserHoldsLazyQueryHookResult = ReturnType<typeof useGetTokensBalanceUserHoldsLazyQuery>;
export type GetTokensBalanceUserHoldsQueryResult = Apollo.QueryResult<GetTokensBalanceUserHoldsQuery, GetTokensBalanceUserHoldsQueryVariables>;
export const GetCreatorTokensDocument = gql`
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

/**
 * __useGetCreatorTokensQuery__
 *
 * To run a query within a React component, call `useGetCreatorTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatorTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatorTokensQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCreatorTokensQuery(baseOptions: Apollo.QueryHookOptions<GetCreatorTokensQuery, GetCreatorTokensQueryVariables>) {
        return Apollo.useQuery<GetCreatorTokensQuery, GetCreatorTokensQueryVariables>(GetCreatorTokensDocument, baseOptions);
      }
export function useGetCreatorTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreatorTokensQuery, GetCreatorTokensQueryVariables>) {
          return Apollo.useLazyQuery<GetCreatorTokensQuery, GetCreatorTokensQueryVariables>(GetCreatorTokensDocument, baseOptions);
        }
export type GetCreatorTokensQueryHookResult = ReturnType<typeof useGetCreatorTokensQuery>;
export type GetCreatorTokensLazyQueryHookResult = ReturnType<typeof useGetCreatorTokensLazyQuery>;
export type GetCreatorTokensQueryResult = Apollo.QueryResult<GetCreatorTokensQuery, GetCreatorTokensQueryVariables>;
export const GetAccountTokenDocument = gql`
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

/**
 * __useGetAccountTokenQuery__
 *
 * To run a query within a React component, call `useGetAccountTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountTokenQuery(baseOptions: Apollo.QueryHookOptions<GetAccountTokenQuery, GetAccountTokenQueryVariables>) {
        return Apollo.useQuery<GetAccountTokenQuery, GetAccountTokenQueryVariables>(GetAccountTokenDocument, baseOptions);
      }
export function useGetAccountTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountTokenQuery, GetAccountTokenQueryVariables>) {
          return Apollo.useLazyQuery<GetAccountTokenQuery, GetAccountTokenQueryVariables>(GetAccountTokenDocument, baseOptions);
        }
export type GetAccountTokenQueryHookResult = ReturnType<typeof useGetAccountTokenQuery>;
export type GetAccountTokenLazyQueryHookResult = ReturnType<typeof useGetAccountTokenLazyQuery>;
export type GetAccountTokenQueryResult = Apollo.QueryResult<GetAccountTokenQuery, GetAccountTokenQueryVariables>;
export const GetCampaignsDocument = gql`
    query getCampaigns($where: CampaignsCondition!) {
  campaigns(where: $where) {
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
    creator {
      id
    }
  }
}
    `;

/**
 * __useGetCampaignsQuery__
 *
 * To run a query within a React component, call `useGetCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCampaignsQuery(baseOptions: Apollo.QueryHookOptions<GetCampaignsQuery, GetCampaignsQueryVariables>) {
        return Apollo.useQuery<GetCampaignsQuery, GetCampaignsQueryVariables>(GetCampaignsDocument, baseOptions);
      }
export function useGetCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCampaignsQuery, GetCampaignsQueryVariables>) {
          return Apollo.useLazyQuery<GetCampaignsQuery, GetCampaignsQueryVariables>(GetCampaignsDocument, baseOptions);
        }
export type GetCampaignsQueryHookResult = ReturnType<typeof useGetCampaignsQuery>;
export type GetCampaignsLazyQueryHookResult = ReturnType<typeof useGetCampaignsLazyQuery>;
export type GetCampaignsQueryResult = Apollo.QueryResult<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetCampaignDocument = gql`
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

/**
 * __useGetCampaignQuery__
 *
 * To run a query within a React component, call `useGetCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCampaignQuery(baseOptions: Apollo.QueryHookOptions<GetCampaignQuery, GetCampaignQueryVariables>) {
        return Apollo.useQuery<GetCampaignQuery, GetCampaignQueryVariables>(GetCampaignDocument, baseOptions);
      }
export function useGetCampaignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCampaignQuery, GetCampaignQueryVariables>) {
          return Apollo.useLazyQuery<GetCampaignQuery, GetCampaignQueryVariables>(GetCampaignDocument, baseOptions);
        }
export type GetCampaignQueryHookResult = ReturnType<typeof useGetCampaignQuery>;
export type GetCampaignLazyQueryHookResult = ReturnType<typeof useGetCampaignLazyQuery>;
export type GetCampaignQueryResult = Apollo.QueryResult<GetCampaignQuery, GetCampaignQueryVariables>;
export const GetDistributorsDocument = gql`
    query getDistributors {
  distributors {
    id
    distributorCid
  }
}
    `;

/**
 * __useGetDistributorsQuery__
 *
 * To run a query within a React component, call `useGetDistributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistributorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDistributorsQuery(baseOptions?: Apollo.QueryHookOptions<GetDistributorsQuery, GetDistributorsQueryVariables>) {
        return Apollo.useQuery<GetDistributorsQuery, GetDistributorsQueryVariables>(GetDistributorsDocument, baseOptions);
      }
export function useGetDistributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistributorsQuery, GetDistributorsQueryVariables>) {
          return Apollo.useLazyQuery<GetDistributorsQuery, GetDistributorsQueryVariables>(GetDistributorsDocument, baseOptions);
        }
export type GetDistributorsQueryHookResult = ReturnType<typeof useGetDistributorsQuery>;
export type GetDistributorsLazyQueryHookResult = ReturnType<typeof useGetDistributorsLazyQuery>;
export type GetDistributorsQueryResult = Apollo.QueryResult<GetDistributorsQuery, GetDistributorsQueryVariables>;
export const GetCheckRequestDocument = gql`
    query getCheckRequest($where: CheckRequestsCondition!) {
  checkRequests(where: $where) {
    id
    account {
      id
    }
    result
    status
  }
}
    `;

/**
 * __useGetCheckRequestQuery__
 *
 * To run a query within a React component, call `useGetCheckRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckRequestQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCheckRequestQuery(baseOptions: Apollo.QueryHookOptions<GetCheckRequestQuery, GetCheckRequestQueryVariables>) {
        return Apollo.useQuery<GetCheckRequestQuery, GetCheckRequestQueryVariables>(GetCheckRequestDocument, baseOptions);
      }
export function useGetCheckRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckRequestQuery, GetCheckRequestQueryVariables>) {
          return Apollo.useLazyQuery<GetCheckRequestQuery, GetCheckRequestQueryVariables>(GetCheckRequestDocument, baseOptions);
        }
export type GetCheckRequestQueryHookResult = ReturnType<typeof useGetCheckRequestQuery>;
export type GetCheckRequestLazyQueryHookResult = ReturnType<typeof useGetCheckRequestLazyQuery>;
export type GetCheckRequestQueryResult = Apollo.QueryResult<GetCheckRequestQuery, GetCheckRequestQueryVariables>;
export const GetClaimDocument = gql`
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

/**
 * __useGetClaimQuery__
 *
 * To run a query within a React component, call `useGetClaimQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClaimQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClaimQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClaimQuery(baseOptions: Apollo.QueryHookOptions<GetClaimQuery, GetClaimQueryVariables>) {
        return Apollo.useQuery<GetClaimQuery, GetClaimQueryVariables>(GetClaimDocument, baseOptions);
      }
export function useGetClaimLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClaimQuery, GetClaimQueryVariables>) {
          return Apollo.useLazyQuery<GetClaimQuery, GetClaimQueryVariables>(GetClaimDocument, baseOptions);
        }
export type GetClaimQueryHookResult = ReturnType<typeof useGetClaimQuery>;
export type GetClaimLazyQueryHookResult = ReturnType<typeof useGetClaimLazyQuery>;
export type GetClaimQueryResult = Apollo.QueryResult<GetClaimQuery, GetClaimQueryVariables>;
export type GetTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokensQuery = (
  { __typename?: 'Query' }
  & { tokens: Array<(
    { __typename?: 'Token' }
    & Pick<Token, 'id'>
  )> }
);

export type GetTokensBalanceUserHoldsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTokensBalanceUserHoldsQuery = (
  { __typename?: 'Query' }
  & { account?: Maybe<(
    { __typename?: 'Account' }
    & { tokens: Array<(
      { __typename?: 'AccountToken' }
      & Pick<AccountToken, 'id' | 'balance'>
      & { token: (
        { __typename?: 'Token' }
        & Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>
      ) }
    )> }
  )> }
);

export type GetCreatorTokensQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCreatorTokensQuery = (
  { __typename?: 'Query' }
  & { creator?: Maybe<(
    { __typename?: 'Creator' }
    & Pick<Creator, 'id'>
    & { tokens: Array<(
      { __typename?: 'Token' }
      & Pick<Token, 'id' | 'name' | 'symbol' | 'decimals' | 'totalSupply' | 'creatorTokenRatio' | 'enableStakeToToken'>
    )> }
  )> }
);

export type GetAccountTokenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAccountTokenQuery = (
  { __typename?: 'Query' }
  & { accountToken?: Maybe<(
    { __typename?: 'AccountToken' }
    & Pick<AccountToken, 'id' | 'balance'>
    & { token: (
      { __typename?: 'Token' }
      & Pick<Token, 'id' | 'name' | 'symbol' | 'totalSupply' | 'decimals' | 'creatorTokenRatio' | 'lockupPeriod'>
    ) }
  )> }
);

export type GetCampaignsQueryVariables = Exact<{
  where: CampaignsCondition;
}>;


export type GetCampaignsQuery = (
  { __typename?: 'Query' }
  & { campaigns: Array<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, 'id' | 'token' | 'campaignInfoCid' | 'startDate' | 'endDate' | 'claimAmount' | 'status'>
    & { distributor: (
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id'>
    ), creator: (
      { __typename?: 'Creator' }
      & Pick<Creator, 'id'>
    ) }
  )> }
);

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCampaignQuery = (
  { __typename?: 'Query' }
  & { campaign?: Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, 'token' | 'campaignInfoCid' | 'recipientsCid' | 'startDate' | 'endDate' | 'claimAmount' | 'claimedNum' | 'status'>
    & { distributor: (
      { __typename?: 'Distributor' }
      & Pick<Distributor, 'id'>
    ) }
  )> }
);

export type GetDistributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDistributorsQuery = (
  { __typename?: 'Query' }
  & { distributors: Array<(
    { __typename?: 'Distributor' }
    & Pick<Distributor, 'id' | 'distributorCid'>
  )> }
);

export type GetCheckRequestQueryVariables = Exact<{
  where: CheckRequestsCondition;
}>;


export type GetCheckRequestQuery = (
  { __typename?: 'Query' }
  & { checkRequests: Array<(
    { __typename?: 'CheckRequest' }
    & Pick<CheckRequest, 'id' | 'result' | 'status'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
    ) }
  )> }
);

export type GetClaimQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetClaimQuery = (
  { __typename?: 'Query' }
  & { claim?: Maybe<(
    { __typename?: 'Claim' }
    & Pick<Claim, 'id' | 'token' | 'amount'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
    ), campaign: (
      { __typename?: 'Campaign' }
      & Pick<Campaign, 'id'>
    ) }
  )> }
);
