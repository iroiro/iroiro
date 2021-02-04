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
import { FanToken__factory as FanTokenFactory } from "../types";
import { Event } from "@ethersproject/contracts";

export const useGetTransferEvents = (
  library: Web3Provider | undefined,
  tokenAddress: string
): {
  result: Event[] | undefined;
  loading: boolean;
  error: any;
} => {
  const [result, setResult] = useState<Event[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    if (loading || error) {
      return;
    }
    const f = async () => {
      if (!library || tokenAddress === "") {
        setError("Invalid arguments.");
        return { result, loading, error };
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = await signer.getAddress();
      const erc20 = FanTokenFactory.connect(tokenAddress, signer);
      const filterFrom = erc20.filters.Transfer(walletAddress, null, null);
      const fromEvents: Event[] = await erc20.queryFilter(filterFrom);
      const filterTo = erc20.filters.Transfer(null, walletAddress, null);
      const toEvents: Event[] = await erc20.queryFilter(filterTo);
      const allEvents = fromEvents.concat(toEvents);

      setLoading(false);
      setResult(allEvents);
    };
    f();
  }, [loading, error, result, library, tokenAddress]);

  return { result, loading, error };
};
