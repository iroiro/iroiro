// TODO Update type
import {Web3Provider} from "@ethersproject/providers";

export interface Web3Props {
    readonly provider: Web3Provider | undefined
    readonly loadWeb3Modal: () => void
}

export interface UserToken {
    readonly address: string
    readonly name: string
    readonly symbol: string
    readonly balance: string
}

export interface Token {
    readonly id: string
    readonly name: string
    readonly symbol: string
    readonly decimals: number
}

export interface AccountToken {
    readonly token: Token
    readonly balance: string
}

export interface Account {
    readonly tokens: AccountToken[]
}

export interface TokenBalanceUserHolds {
    readonly account: Account
}