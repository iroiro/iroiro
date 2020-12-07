import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
// @ts-ignore
import { abis } from "@project/contracts";
import { TokenBasic } from "../interfaces";

export const getTokenInfo = async (
  library: Web3Provider | undefined,
  tokenAddress: string
): Promise<TokenBasic | undefined> => {
  if (!library || tokenAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const erc20 = new Contract(tokenAddress, abis.fanToken, signer);
  const name = (await erc20.name()) as string;
  const symbol = (await erc20.symbol()) as string;
  const decimals = (await erc20.decimals()) as number;
  const totalSupply = (await erc20.totalSupply()) as number;
  return {
    tokenAddress: tokenAddress,
    name: name,
    symbol: symbol,
    decimals: decimals,
    totalSupply: totalSupply.toString(),
  };
};
