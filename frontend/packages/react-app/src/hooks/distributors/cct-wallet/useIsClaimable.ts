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
import { CCTWalletCampaign__factory } from "../../../types";
import { WalletCampaign__factory } from "../../../types";

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

    if (distributorType === "audius") {
      checkAudiusState();
    }
    if (distributorType === "wallet") {
      checkWalletState();
    }
  }, [library, fromAddress, campaignAddress]);
  return { isClaimable: result, loading, error };
};
