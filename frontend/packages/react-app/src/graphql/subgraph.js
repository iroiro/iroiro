import {gql} from "apollo-boost";

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
                }
            }
        }
    }
`;
