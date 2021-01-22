import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { CCTWalletCampaign__factory } from "../../../types";

export const useIsClaimable = (
  library: Web3Provider | undefined,
  campaignAddress: string,
  distributorType: string,
  fromAddress: string
): {
  isClaimable: boolean;
  loading: boolean;
  error: any;
} => {
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    const checkAudiusState = async () => {
      if (!library || fromAddress === "" || campaignAddress === "") {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = await signer.getAddress();
      const campaign = CCTWalletCampaign__factory.connect(
        campaignAddress,
        signer
      );
      const isClaimable = await campaign.isClaimable(
        fromAddress,
        walletAddress
      );
      setLoading(false);
      setResult(isClaimable);
    };

    const checkWalletState = async () => {
      // TODO
      setError(undefined);
      setLoading(false);
      setResult(true);
    };

    if (distributorType === "audius") {
      checkAudiusState();
    }
    if (distributorType === "wallet") {
      checkWalletState();
    }
  }, [library, fromAddress, campaignAddress]);
  return { isClaimable: result, loading, error };
};
