import { Web3Provider } from "@ethersproject/providers";
import { TokenBasic } from "../interfaces";
import { FanToken__factory as FanTokenFactory } from "../types";
import { AudiusFollowersDistributor__factory as AudiusFollowersDistributor } from "../types";
import BN from "bn.js";
import { ContractTransaction } from "@ethersproject/contracts";
// @ts-ignore
import { addresses } from "@project/contracts";

export const getTokenInfo = async (
  library: Web3Provider | undefined,
  tokenAddress: string
): Promise<TokenBasic | undefined> => {
  if (!library || tokenAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  const name = await erc20.name();
  const symbol = await erc20.symbol();
  const decimals = await erc20.decimals();
  const totalSupply = await erc20.totalSupply();
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
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  const balance = await erc20.balanceOf(walletAddress);
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

export const getAllowance = async (
  library: Web3Provider | undefined,
  tokenAddress: string,
  distributorAddress: string
): Promise<string | undefined> => {
  if (!library || distributorAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  const allowance = await erc20.allowance(walletAddress, distributorAddress);
  return allowance.toString();
};

export const setApproveAmount = async (
  library: Web3Provider | undefined,
  tokenAddress: string,
  distributorAddress: string,
  approveAmount: string
): Promise<ContractTransaction | undefined> => {
  if (!library || distributorAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  // const walletAddress = await signer.getAddress();
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  return erc20
    .approve(distributorAddress, approveAmount)
    .then((transaction) => {
      return transaction;
    });
};

export const createCampaign = async (
  library: Web3Provider | undefined,
  tokenAddress: string,
  campaignInfoCid: string,
  recipientsCid: string,
  recipientsNum: number,
  startDate: number,
  endDate: number
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();
  const distributor = AudiusFollowersDistributor.connect(
    addresses.AudiusFollowersDistributor,
    signer
  );

  return distributor
    .createCampaign(
      tokenAddress,
      walletAddress,
      campaignInfoCid,
      recipientsCid,
      recipientsNum,
      startDate,
      endDate
    )
    .then((transaction) => {
      return transaction;
    });
};
