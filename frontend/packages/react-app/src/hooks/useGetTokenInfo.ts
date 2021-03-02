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

import { useCallback, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ERC20Mock__factory as ERC20MockFactory } from "../types/factories/ERC20Mock__factory";
import { TokenBasic } from "../interfaces";
import { isAddress } from "ethers/lib/utils";

export const useGetTokenInfo = (
  library: Web3Provider | undefined,
  tokenAddress: string
): {
  getTokenInfo: () => void;
  token: TokenBasic | undefined;
  loading: boolean;
  error: any;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();
  const [token, setToken] = useState<TokenBasic | undefined>(undefined);

  const getTokenInfo = useCallback(async () => {
    if (
      library === undefined ||
      tokenAddress === "" ||
      !isAddress(tokenAddress)
    ) {
      setLoading(false);
      setToken(undefined);
      setError("Invalid arguments.");
      return;
    }
    setLoading(true);
    setError(undefined);
    const signer = library.getSigner();
    const erc20 = ERC20MockFactory.connect(tokenAddress, signer);
    try {
      const name = await erc20.name();
      const symbol = await erc20.symbol();
      const decimals = await erc20.decimals();
      const totalSupply = await erc20.totalSupply();
      setToken({
        tokenAddress,
        name,
        symbol,
        decimals,
        totalSupply: totalSupply.toString(),
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  }, [loading, error, library, tokenAddress, setToken]);

  return {
    getTokenInfo,
    token,
    loading,
    error,
  };
};
