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

import { useCallback } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { CCTWalletCampaign__factory } from "../../../types";

export const useGetIsClaimable = (
  library: Web3Provider | undefined,
  campaignAddress: string,
  fromAddress: string
): (() => Promise<boolean | undefined>) => {
  return useCallback(async () => {
    if (!library || fromAddress === "" || campaignAddress === "") {
      return undefined;
    }
    const signer = library.getSigner();
    const walletAddress = await signer.getAddress();
    const campaign = CCTWalletCampaign__factory.connect(
      campaignAddress,
      signer
    );

    return await campaign.isClaimable(fromAddress, walletAddress);
  }, [library, fromAddress, campaignAddress]);
};
