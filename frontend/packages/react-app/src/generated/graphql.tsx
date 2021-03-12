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
  Bytes: string;
  BigInt: string;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  claims: Array<Claim>;
};



export type Campaign = {
  __typename?: 'Campaign';
  /** Equals to: <distributorAddress>-<campaignId> */
  id: Scalars['ID'];
  distributor: Distributor;
  token: Scalars['String'];
  /** Campaign creator not only token creator */
  creator: Creator;
  campaignInfoCid?: Maybe<Scalars['String']>;
  merkleTreeCid?: Maybe<Scalars['String']>;
  merkleRoot?: Maybe<Scalars['Bytes']>;
  claimedNum?: Maybe<Scalars['BigInt']>;
  claims: Array<Claim>;
};

export type CampaignsCondition = {
  token: Scalars['String'];
};

export type CheckRequestsCondition = {
  account: Scalars['String'];
  campaign: Scalars['String'];
};

export type Claim = {
  __typename?: 'Claim';
  /** Equals to: <distributorAddress>-<campaignId>-<accountAddress> */
  id: Scalars['ID'];
  account: Account;
  campaign: Campaign;
  token: Scalars['String'];
  amount?: Maybe<Scalars['BigInt']>;
};

export type Creator = {
  __typename?: 'Creator';
  id: Scalars['ID'];
  campaigns: Array<Campaign>;
};

export type Distributor = {
  __typename?: 'Distributor';
  id: Scalars['ID'];
  distributorInfoCid?: Maybe<Scalars['String']>;
  campaigns: Array<Campaign>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  creator?: Maybe<Creator>;
  campaigns: Array<Campaign>;
  campaign?: Maybe<Campaign>;
  distributors: Array<Distributor>;
  claim?: Maybe<Claim>;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};


export type QueryCreatorArgs = {
  id: Scalars['ID'];
};


export type QueryCampaignsArgs = {
  where: CampaignsCondition;
};


export type QueryCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryClaimArgs = {
  id: Scalars['ID'];
};


export const GetCampaignsDocument = gql`
    query getCampaigns($where: CampaignsCondition!) {
  campaigns(where: $where) {
    id
    token
    distributor {
      id
    }
    campaignInfoCid
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
    claimedNum
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
    distributorInfoCid
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
export type GetCampaignsQueryVariables = Exact<{
  where: CampaignsCondition;
}>;


export type GetCampaignsQuery = (
  { __typename?: 'Query' }
  & { campaigns: Array<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, 'id' | 'token' | 'campaignInfoCid'>
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
    & Pick<Campaign, 'token' | 'campaignInfoCid' | 'claimedNum'>
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
    & Pick<Distributor, 'id' | 'distributorInfoCid'>
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
