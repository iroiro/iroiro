import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
// @ts-ignore
import { abis } from "@project/contracts";
import { TokenBasic } from "../interfaces";
import BN from "bn.js";

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
  const totalSupply = (await erc20.totalSupply()) as BN;
  return {
    tokenAddress: tokenAddress,
    name: name,
    symbol: symbol,
    decimals: decimals,
    totalSupply: totalSupply.toString(),
  };
};

export const getWalletBalance = async (
  library: Web3Provider | undefined,
  tokenAddress: string
): Promise<string | undefined> => {
  if (!library || tokenAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();
  const erc20 = new Contract(tokenAddress, abis.fanToken, signer);
  const balance = (await erc20.balanceOf(walletAddress)) as BN;
  return balance.toString();
};

export const getBalanceDevidedByDecimals = (
  balance: string,
  decimals: number
): string => {
  // TODO support decimal points
  const balanceBN = new BN(balance);
  const divided = balanceBN.div(new BN(10).pow(new BN(decimals)));
  return divided.toString();
};
