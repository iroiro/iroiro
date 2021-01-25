import { Web3Provider } from "@ethersproject/providers";
import { TokenBasic } from "../interfaces";
import { FanToken__factory as FanTokenFactory } from "../types";
import { CCTWalletDistributor__factory as CCTWalletDistributor } from "../types";
import { WalletDistributor__factory as WalletDistributor } from "../types";
import { CampaignInterface__factory as Campaign } from "../types";
import { WalletCampaign__factory as WalletCampaign } from "../types";
import { ContractTransaction } from "@ethersproject/contracts";
// @ts-ignore
import { addresses } from "@project/contracts";
import { Bytes, utils } from "ethers";

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

export const getContractTokenBalance = async (
  library: Web3Provider | undefined,
  tokenAddress: string,
  contractAddress: string
): Promise<string | undefined> => {
  if (!library || tokenAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  const balance = await erc20.balanceOf(contractAddress);
  const decimals = await erc20.decimals();
  const formatBalance = utils.formatUnits(balance, decimals.toString());
  return formatBalance;
};

export const getBalanceDevidedByDecimals = (
  balance: string,
  decimals: number
): string => {
  const divided = utils.formatUnits(balance, decimals.toString());
  return divided;
};

export const parseUnits = (balance: string, decimals: number): string => {
  const parsedBalance = utils.parseUnits(balance, decimals.toString());
  return parsedBalance.toString();
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
  approveAmount: string,
  decimals: number
): Promise<ContractTransaction | undefined> => {
  if (!library || distributorAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const erc20 = FanTokenFactory.connect(tokenAddress, signer);
  const parsedApproveAmount = parseUnits(approveAmount, decimals);

  return erc20
    .approve(distributorAddress, parsedApproveAmount)
    .then((transaction) => {
      return transaction;
    });
};

export const createAudiusCampaign = async (
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
  const distributor = CCTWalletDistributor.connect(
    addresses.CCTWalletDistributor,
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
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const createWalletCampaign = async (
  library: Web3Provider | undefined,
  merkleRoot: string,
  tokenAddress: string,
  campaignInfoCid: string,
  recipientsCid: string,
  merkleTreeCid: string,
  recipientsNum: number,
  startDate: number,
  endDate: number
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();
  const distributor = WalletDistributor.connect(
    addresses.WalletDistributor,
    signer
  );

  return distributor
    .createCampaign(
      merkleRoot,
      tokenAddress,
      walletAddress,
      campaignInfoCid,
      recipientsCid,
      merkleTreeCid,
      recipientsNum,
      startDate,
      endDate
    )
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const cancelCampaign = async (
  library: Web3Provider | undefined,
  campaignAddress: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();

  const campaignContract = Campaign.connect(campaignAddress, signer);

  return campaignContract
    .cancelCampaign()
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const refundCampaign = async (
  library: Web3Provider | undefined,
  campaignAddress: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const campaignContract = Campaign.connect(campaignAddress, signer);

  return campaignContract
    .refundRemainingTokens()
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const walletClaim = async (
  library: Web3Provider | undefined,
  campaignAddress: string,
  merkleTreeCid: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();

  // const baseUrl =
  //   "https://iroiro-wallet-campaign-merkle-proofs.s3-ap-northeast-1.amazonaws.com/";
  // const url = `${baseUrl}${merkleTreeCid}/${walletAddress.toLowerCase()}.json`;
  // const response = await fetch(url, {
  //   method: "GET",
  //   mode: "no-cors",
  // });
  // console.log(response);
  // const sample = await response.json();
  // console.log(sample);

  const campaignContract = WalletCampaign.connect(campaignAddress, signer);

  // TODO
  return campaignContract
    .claim(0, walletAddress, "0x64", [
      "0x7311552d5f9556294eef04cdff6a9cc8e52a4495f176f4afd05703eee0965701",
      "0xc97b2929d684f9ccf38caadfa13e3661db2f2f54dbbaec067ea5cddffc5119bc",
    ])
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};
