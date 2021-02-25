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

import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ERC20Mock__factory as ERC20MockFactory } from "../types/factories/ERC20Mock__factory";
import { BigNumber } from "ethers";

export const useGetAllowance = (
  library: Web3Provider | undefined,
  tokenAddress: string,
  campaignAddress: string
): {
  allowance: BigNumber | undefined;
  loading: boolean;
  error: any;
} => {
  const [result, setResult] = useState<BigNumber | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    const f = async () => {
      if (!library || tokenAddress === "" || campaignAddress === "") {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = await signer.getAddress();
      const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
      const balance = await erc20.allowance(walletAddress, campaignAddress);
      setLoading(false);
      setResult(balance);
    };
    f();
  }, [library, tokenAddress, campaignAddress]);

  return { allowance: result, loading, error };
};
