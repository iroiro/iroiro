import { Web3Provider } from "@ethersproject/providers";
import { CCTWalletCampaign__factory } from "../../../types";
import { ContractTransaction } from "@ethersproject/contracts";
import { useCallback } from "react";

export const useClaim = (
  library: Web3Provider | undefined,
  campaignAddress: string
): (() => Promise<ContractTransaction | undefined>) => {
  return useCallback(async () => {
    if (!library || campaignAddress === "") {
      return undefined;
    }
    const signer = library.getSigner();
    const campaign = CCTWalletCampaign__factory.connect(
      campaignAddress,
      signer
    );
    return undefined;
    // campaign
    //   .claim() // TODO: need newly added arguments
    //   .then((transaction) => {
    //     console.debug(transaction);
    //     return transaction;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return error;
    //   });
  }, [library, campaignAddress]);
};
