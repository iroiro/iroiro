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
      console.debug(allEvents);
    };
    f();
  }, [library, tokenAddress]);

  return { result, loading, error };
};
