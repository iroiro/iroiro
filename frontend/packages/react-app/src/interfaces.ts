// TODO Update type
import {Web3Provider} from "@ethersproject/providers";

export interface Web3Props {
    readonly provider: Web3Provider | undefined
    readonly loadWeb3Modal: () => void
}

