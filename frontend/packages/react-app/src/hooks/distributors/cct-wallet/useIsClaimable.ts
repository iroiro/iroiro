import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import {
  CCTWalletCampaign__factory,
  UUIDCampaign__factory,
} from "../../../types";
import { WalletCampaign__factory } from "../../../types";

export const useIsClaimable = (
  library: Web3Provider | undefined,
  campaignAddress: string,
  distributorType: string,
  fromAddress: string,
  hashedUUID: string
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
      if (!library || campaignAddress === "") {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = await signer.getAddress();
      const campaign = WalletCampaign__factory.connect(campaignAddress, signer);
      const recipientsCid = await campaign.recipientsCid();
      const url = `https://cloudflare-ipfs.com/ipfs/${recipientsCid}`;
      const response = await fetch(url);
      const data = await response.json();
      const index = data.targets.findIndex(
        (item: string) => item === walletAddress
      );
      setLoading(false);
      if (index === -1) {
        setResult(false);
        return;
      }
      setResult(true);
    };

    const checkUUIDState = async () => {
      if (!library || campaignAddress === "" || hashedUUID === undefined) {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const campaign = UUIDCampaign__factory.connect(campaignAddress, signer);
      const recipientsCid = await campaign.recipientsCid();
      const url = `https://cloudflare-ipfs.com/ipfs/${recipientsCid}`;
      const response = await fetch(url);
      const data = await response.json();
      const index = data.targets.findIndex(
        (item: string) => item === hashedUUID
      );
      setLoading(false);
      if (index === -1) {
        setResult(false);
        return;
      }
      setResult(true);
    };

    switch (distributorType) {
      case "audius":
        checkAudiusState();
        break;
      case "wallet":
        checkWalletState();
        break;
      case "uuid":
        checkUUIDState();
        break;
    }
  }, [library, fromAddress, campaignAddress]);
  return { isClaimable: result, loading, error };
};
