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
import { CCTWalletCampaign__factory } from "../../../types";
import { ethers } from "ethers";
import { ContractTransaction } from "@ethersproject/contracts";
import { useCallback } from "react";

export const useRequestCheckingIsClaimable = (
  library: Web3Provider | undefined,
  oracleAddress: string,
  jobId: string,
  campaignAddress: string,
  walletAddress: string // TODO enable switching Audius wallet and web wallet
): (() => Promise<ContractTransaction | undefined>) => {
  return useCallback(async () => {
    if (
      !library ||
      oracleAddress === "" ||
      jobId === "" ||
      campaignAddress === ""
    ) {
      return undefined;
    }
    const signer = library.getSigner();
    const campaign = CCTWalletCampaign__factory.connect(
      campaignAddress,
      signer
    );
    const jobIdBytes = ethers.utils.toUtf8Bytes(jobId);
    // const walletAddress = await signer.getAddress();
    return campaign
      .requestCheckingIsClaimable(oracleAddress, jobIdBytes, walletAddress)
      .then((transaction) => {
        console.debug(transaction);
        return transaction;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }, [library, oracleAddress, jobId, campaignAddress, walletAddress]);
};
