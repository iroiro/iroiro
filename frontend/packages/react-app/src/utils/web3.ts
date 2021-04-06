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

import {
  Web3Provider,
  getDefaultProvider,
  Provider,
} from "@ethersproject/providers";
import { utils, Signer, BigNumber } from "ethers";
import { TokenBasic } from "../interfaces";
import { ERC20__factory as ERC20Factory } from "../types/factories/ERC20__factory";
import { ERC20Mock__factory as ERC20MockFactory } from "../types/factories/ERC20Mock__factory";
import {
  UUIDDistributor__factory,
  UUIDDistributor__factory as UUIDDistributor,
} from "../types/factories/UUIDDistributor__factory";
import { WalletDistributor__factory as WalletDistributor } from "../types/factories/WalletDistributor__factory";
import { ContractTransaction } from "@ethersproject/contracts";
import { Network } from "@ethersproject/networks";
// @ts-ignore
import { addresses } from "@project/contracts";
import { MERKLE_PROOF_API } from "../utils/const";
import {
  WalletDistributor__factory,
  IMerkleDistributorManager__factory,
  WalletNFTDistributor__factory,
  UUIDNFTDistributor__factory,
} from "../types";

export const getTokenInfo = async (
  library: Web3Provider | undefined,
  tokenAddress: string
): Promise<TokenBasic | undefined> => {
  if (tokenAddress === "") {
    return undefined;
  }

  let provider: Provider | Signer;

  if (!library) {
    provider = getDefaultProvider(process.env.REACT_APP_RPC_URL);
  } else {
    provider = library.getSigner();
  }

  const erc20 = ERC20Factory.connect(tokenAddress, provider);
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

// TODO extract as hooks
export const getWalletBalance = async (
  library: Web3Provider | undefined,
  tokenAddress: string
): Promise<string | undefined> => {
  if (!library || tokenAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const walletAddress = await signer.getAddress();
  const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
  const balance = await erc20.balanceOf(walletAddress).catch((error) => {
    console.error(error);
    return undefined;
  });
  if (balance === undefined) {
    return balance;
  }
  return balance.toString();
};

export const getCampaignBalance = async (
  library: Web3Provider | undefined,
  distributorAddress: string,
  campaignId: string
): Promise<string | undefined> => {
  if (!library || distributorAddress === "" || campaignId === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const manager = IMerkleDistributorManager__factory.connect(
    distributorAddress,
    signer
  );
  const token = await manager.token(campaignId);
  const balance = await manager.remainingAmount(campaignId);
  const erc20 = ERC20MockFactory.connect(token, signer);
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

// TODO extract as hooks
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
  const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
  const allowance = await erc20
    .allowance(walletAddress, distributorAddress)
    .catch((error) => {
      console.error(error);
      return undefined;
    });
  if (allowance === undefined) {
    return undefined;
  }
  return allowance.toString();
};

export const setApproveAmount = async (
  library: Web3Provider | undefined,
  tokenAddress: string,
  distributorAddress: string,
  approveAmount: string,
  decimals: number,
  recipients: number
): Promise<ContractTransaction | undefined> => {
  if (!library || distributorAddress === "") {
    return undefined;
  }
  const signer = library.getSigner();
  const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
  const totalAmount = getTotalApproveAmount(
    approveAmount,
    recipients,
    decimals
  );
  if (totalAmount === undefined) {
    return undefined;
  }

  return erc20.approve(distributorAddress, totalAmount).then((transaction) => {
    return transaction;
  });
};

export const createWalletCampaign = async (
  library: Web3Provider | undefined,
  merkleRoot: string,
  tokenAddress: string,
  campaignInfoCid: string,
  merkleTreeCid: string,
  allowance: string | undefined
): Promise<ContractTransaction | undefined> => {
  if (!library || allowance === undefined) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = WalletDistributor.connect(
    addresses.WalletDistributor,
    signer
  );

  return distributor
    .createCampaign(
      merkleRoot,
      tokenAddress,
      merkleTreeCid,
      campaignInfoCid,
      allowance
    )
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const createWalletNFTCampaign = async (
  library: Web3Provider | undefined,
  merkleRoot: string,
  tokenAddress: string,
  nftMetadataCid: string,
  merkleTreeCid: string
): Promise<ContractTransaction | undefined> => {
  if (library === undefined) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = WalletNFTDistributor__factory.connect(
    addresses.WalletNFTDistributor,
    signer
  );

  return distributor
    .createCampaign(merkleRoot, merkleTreeCid, nftMetadataCid)
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
  merkleTreeCid: string,
  allowance: string | undefined
): Promise<ContractTransaction | undefined> => {
  if (!library || allowance === undefined) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = UUIDDistributor.connect(
    addresses.UUIDDistributor,
    signer
  );

  return distributor
    .createCampaign(
      merkleRoot,
      tokenAddress,
      merkleTreeCid,
      campaignInfoCid,
      allowance
    )
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const createUUIDNFTCampaign = async (
  library: Web3Provider | undefined,
  merkleRoot: string,
  nftMetadataCid: string,
  merkleTreeCid: string
): Promise<ContractTransaction | undefined> => {
  if (library === undefined) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = UUIDNFTDistributor__factory.connect(
    addresses.UUIDNFTDistributor,
    signer
  );

  return distributor
    .createCampaign(merkleRoot, merkleTreeCid, nftMetadataCid)
    .then((transaction: ContractTransaction) => {
      return transaction;
    });
};

export const walletClaim = async (
  library: Web3Provider | undefined,
  distributorAddress: string,
  campaignId: string,
  merkleTreeCid: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = WalletDistributor__factory.connect(
    distributorAddress,
    signer
  );
  const walletAddress = await signer.getAddress();
  const walletAddressLow = walletAddress.toLowerCase();
  const response = await fetch(
    `${MERKLE_PROOF_API}/${merkleTreeCid}/${walletAddressLow}.json`
  );
  const data = await response.json();

  return distributor.functions
    .claim(campaignId, data.index, walletAddress, data.amount, data.proof)
    .then((transaction) => {
      return transaction;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

export const walletNFTClaim = async (
  library: Web3Provider | undefined,
  distributorAddress: string,
  campaignId: string,
  merkleTreeCid: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = WalletNFTDistributor__factory.connect(
    distributorAddress,
    signer
  );
  const walletAddress = await signer.getAddress();
  const walletAddressLow = walletAddress.toLowerCase();
  const response = await fetch(
    `${MERKLE_PROOF_API}/${merkleTreeCid}/${walletAddressLow}.json`
  );
  const data = await response.json();

  return distributor.functions
    .claim(campaignId, data.index, walletAddress, data.proof)
    .then((transaction) => {
      return transaction;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

export const uuidClaim = async (
  library: Web3Provider | undefined,
  distributorAddress: string,
  campaignId: string,
  merkleTreeCid: string,
  uuid: string,
  hashedUUID: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = UUIDDistributor__factory.connect(
    distributorAddress,
    signer
  );
  const response = await fetch(
    `${MERKLE_PROOF_API}/${merkleTreeCid}/${hashedUUID}.json`
  );
  const data = await response.json();

  return distributor.functions
    .claim(campaignId, data.index, uuid, data.amount, data.proof)
    .then((transaction: ContractTransaction) => {
      return transaction;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

export const uuidNFTClaim = async (
  library: Web3Provider | undefined,
  distributorAddress: string,
  campaignId: string,
  merkleTreeCid: string,
  uuid: string,
  hashedUUID: string
): Promise<ContractTransaction | undefined> => {
  if (!library) {
    return undefined;
  }
  const signer = library.getSigner();
  const distributor = UUIDNFTDistributor__factory.connect(
    distributorAddress,
    signer
  );
  const response = await fetch(
    `${MERKLE_PROOF_API}/${merkleTreeCid}/${hashedUUID}.json`
  );
  const data = await response.json();

  return distributor.functions
    .claim(campaignId, data.index, uuid, data.proof)
    .then((transaction: ContractTransaction) => {
      return transaction;
    })
    .catch((error) => {
      console.error(error);
      return undefined;
    });
};

export const getTotalApproveAmount = (
  approveAmount: string,
  recipients: number,
  decimals?: number
): string | undefined => {
  try {
    const totalAmountWithoutDecimals = parseUnits(
      approveAmount === "" ? "0" : approveAmount,
      decimals ?? 0
    );
    return BigNumber.from(totalAmountWithoutDecimals)
      .mul(recipients)
      .toString();
  } catch (e) {
    return undefined;
  }
};
