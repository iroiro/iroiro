import { Web3Provider } from "@ethersproject/providers";
import { FanToken__factory as FanTokenFactory } from "../types";
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
    const erc20 = FanTokenFactory.connect(tokenAddress, signer);
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
