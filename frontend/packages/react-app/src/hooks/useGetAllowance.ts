import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { FanToken__factory as FanTokenFactory } from "../types";
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
      const erc20 = FanTokenFactory.connect(tokenAddress, signer);
      const balance = await erc20.allowance(walletAddress, campaignAddress);
      setLoading(false);
      setResult(balance);
    };
    f();
  }, [library, tokenAddress, campaignAddress]);

  return { allowance: result, loading, error };
};
