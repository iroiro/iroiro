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
import { ERC20Mock__factory as ERC20MockFactory } from "../types/factories/ERC20Mock__factory";
import { BigNumber } from "ethers";
import { ContractTransaction } from "@ethersproject/contracts";
import { useCallback } from "react";

export const useApproveToken = (
  library: Web3Provider | undefined,
  tokenAddress: string,
  campaignAddress: string,
  amount: string
): (() => Promise<ContractTransaction | undefined>) => {
  return useCallback(async () => {
    if (!library || tokenAddress === "" || campaignAddress === "") {
      return undefined;
    }
    const signer = library.getSigner();
    const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
    return erc20
      .approve(campaignAddress, BigNumber.from(amount))
      .then((transaction) => {
        return transaction;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }, [library, tokenAddress, campaignAddress, amount]);
};
