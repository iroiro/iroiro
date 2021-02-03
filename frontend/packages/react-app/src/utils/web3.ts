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

import { Web3Provider } from "@ethersproject/providers";
import { TokenBasic } from "../interfaces";
import { FanToken__factory as FanTokenFactory } from "../types";
import {
  CCTWalletDistributor__factory as CCTWalletDistributor,
  WalletDistributor__factory as WalletDistributor,
  CampaignInterface__factory as Campaign,
  WalletCampaign__factory as WalletCampaign,
  UUIDDistributor__factory as UUIDDistributor,
} from "../types";
import { ContractTransaction } from "@ethersproject/contracts";
// @ts-ignore
import { addresses } from "@project/contracts";
import { utils } from "ethers";
import { MERKLE_PROOF_API } from "../utils/const";

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

// TODO move as custom hooks
export const createUUIDCampaign = async (
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
  const distributor = UUIDDistributor.connect(
    addresses.UUIDDistributor,
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
  const campaignContract = WalletCampaign.connect(campaignAddress, signer);
  const walletAddress = await signer.getAddress();
  const walletAddressLow = walletAddress.toLowerCase();
  const response = await fetch(
    `${MERKLE_PROOF_API}/${merkleTreeCid}/${walletAddressLow}.json`
  );
  const data = await response.json();
  return campaignContract
    .claim(data.index, walletAddress, data.amount, data.proof)
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};
