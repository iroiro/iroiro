import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { FanToken__factory as FanTokenFactory } from "../types";
import { BigNumber } from "ethers";

export const useGetWalletBalance = (
  library: Web3Provider | undefined,
  tokenAddress: string
): {
  result: BigNumber | undefined;
  loading: boolean;
  error: any;
} => {
  const [result, setResult] = useState<BigNumber | undefined>();
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
      const balance = await erc20.balanceOf(walletAddress);
      setLoading(false);
      setResult(balance);
    };
    f();
  }, [loading, error, result, library, tokenAddress]);

  return { result, loading, error };
};
