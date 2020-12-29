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
