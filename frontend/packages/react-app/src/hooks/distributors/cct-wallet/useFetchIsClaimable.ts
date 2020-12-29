import { useCallback } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { CCTWalletCampaign__factory } from "../../../types";

export const useGetIsClaimable = (
  library: Web3Provider | undefined,
  campaignAddress: string,
  fromAddress: string
): (() => Promise<boolean | undefined>) => {
  return useCallback(async () => {
    console.log(fromAddress, campaignAddress);
    if (!library || fromAddress === "" || campaignAddress === "") {
      console.log("hoge");
      return undefined;
    }
    const signer = library.getSigner();
    const walletAddress = await signer.getAddress();
    const campaign = CCTWalletCampaign__factory.connect(
      campaignAddress,
      signer
    );

    console.log(await campaign.isClaimable(fromAddress, walletAddress));
    return await campaign.isClaimable(fromAddress, walletAddress);
  }, [library, fromAddress, campaignAddress]);
};
