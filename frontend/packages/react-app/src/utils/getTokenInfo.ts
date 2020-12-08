import { Web3Provider } from "@ethersproject/providers";
import {
  FanToken,
  FanToken__factory as FanTokenFactory,
} from "../../../../../types/ethers";

export const getTokenInfo = async (
  dispatch: any,
  library: Web3Provider,
  tokenAddress: string
) => {
  const signer = library.getSigner();
  const erc20: FanToken = FanTokenFactory.connect(tokenAddress, signer);
  const name = await erc20.name();
  const symbol = await erc20.symbol();
  const decimals = await erc20.decimals();
  const totalSupply = await erc20.totalSupply();
  const token = {
    tokenAddress: tokenAddress,
    name: name,
    symbol: symbol,
    decimals: decimals,
    totalSupply: totalSupply,
  };
  dispatch({ type: "token:set", payload: { data: token } });
};
