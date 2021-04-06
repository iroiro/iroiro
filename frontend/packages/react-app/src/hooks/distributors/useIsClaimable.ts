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
import { MERKLE_PROOF_API } from "../../utils/const";
import { StringClaim } from "@iroiro/merkle-distributor";
import {
  UUIDDistributor__factory,
  UUIDNFTDistributor__factory,
  WalletDistributor__factory,
  WalletNFTDistributor__factory,
} from "../../types";
import { BigNumber } from "ethers";

export const useIsClaimable = (
  library: Web3Provider | undefined,
  campaignId: string,
  distributorAddress: string,
  distributorType: string,
  hashedUUID: string
): {
  isClaimable: boolean;
  isProofPresent: boolean;
  claimableAmount: string;
  loading: boolean;
  error: any;
} => {
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [isProofPresent, setIsProofPresent] = useState<boolean>(false);
  const [claimableAmount, setClaimableAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    // TODO merge each check state
    const checkWalletState = async () => {
      if (!library || distributorAddress === "" || campaignId === "") {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = (await signer.getAddress()).toLowerCase();
      const distributor = WalletDistributor__factory.connect(
        distributorAddress,
        signer
      );
      const events = await distributor.queryFilter(
        distributor.filters.CreateCampaign(
          BigNumber.from(campaignId),
          null,
          null,
          null,
          null
        )
      );
      const event = events.find(
        (event) => event.args.distributionId.toString() === campaignId
      );
      if (event === undefined) {
        setError("Event not found.");
        setLoading(false);
        return;
      }
      const merkleTreeCid = event.args.merkleTreeCid;
      const url = `${MERKLE_PROOF_API}/${merkleTreeCid}/${walletAddress}.json`;
      const response = await fetch(url);
      const claim = (await response.json()) as StringClaim;
      setLoading(false);
      if (claim === undefined) {
        setIsClaimable(false);
        return;
      }
      const [isClaimed] = await distributor.functions.isClaimed(
        campaignId,
        claim.index
      );
      setIsProofPresent(true);
      setIsClaimable(!isClaimed);
      setClaimableAmount(claim.amount);
    };

    const checkWalletNFTState = async () => {
      if (!library || distributorAddress === "" || campaignId === "") {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const walletAddress = (await signer.getAddress()).toLowerCase();
      const distributor = WalletNFTDistributor__factory.connect(
        distributorAddress,
        signer
      );
      const events = await distributor.queryFilter(
        distributor.filters.CreateCampaign(
          BigNumber.from(campaignId),
          null,
          null,
          null
        )
      );
      const event = events.find(
        (event) => event.args.treeId.toString() === campaignId
      );
      if (event === undefined) {
        setError("Event not found.");
        setLoading(false);
        return;
      }
      const merkleTreeCid = event.args.merkleTreeCid;
      const url = `${MERKLE_PROOF_API}/${merkleTreeCid}/${walletAddress}.json`;
      const response = await fetch(url);
      const claim = (await response.json()) as StringClaim;
      setLoading(false);
      if (claim === undefined) {
        setIsClaimable(false);
        return;
      }
      const [isClaimed] = await distributor.functions.isProven(
        campaignId,
        claim.index
      );
      setIsProofPresent(true);
      setIsClaimable(!isClaimed);
      setClaimableAmount(claim.amount);
    };

    const checkUUIDState = async () => {
      if (!library || campaignId === "" || hashedUUID === undefined) {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const distributor = UUIDDistributor__factory.connect(
        distributorAddress,
        signer
      );
      const events = await distributor.queryFilter(
        distributor.filters.CreateCampaign(
          BigNumber.from(campaignId),
          null,
          null,
          null,
          null
        )
      );
      const event = events.find(
        (event) => event.args.distributionId.toString() === campaignId
      );
      if (event === undefined) {
        setError("Event not found.");
        setLoading(false);
        return;
      }
      const merkleTreeCid = event.args.merkleTreeCid;
      const url = `${MERKLE_PROOF_API}/${merkleTreeCid}/${hashedUUID}.json`;
      const response = await fetch(url);
      const claim = (await response.json()) as StringClaim;
      setLoading(false);
      if (claim === undefined) {
        setIsClaimable(false);
        return;
      }
      const [isClaimed] = await distributor.functions.isClaimed(
        campaignId,
        claim.index
      );
      setIsProofPresent(true);
      setIsClaimable(!isClaimed);
      setClaimableAmount(claim.amount);
    };

    const checkUUIDNFTState = async () => {
      if (!library || campaignId === "" || hashedUUID === undefined) {
        setError("Invalid arguments.");
        return;
      }
      setLoading(true);
      setError(undefined);
      const signer = library.getSigner();
      const distributor = UUIDNFTDistributor__factory.connect(
        distributorAddress,
        signer
      );
      const events = await distributor.queryFilter(
        distributor.filters.CreateCampaign(
          BigNumber.from(campaignId),
          null,
          null,
          null
        )
      );
      const event = events.find(
        (event) => event.args.treeId.toString() === campaignId
      );
      if (event === undefined) {
        setError("Event not found.");
        setLoading(false);
        return;
      }
      const merkleTreeCid = event.args.merkleTreeCid;
      const url = `${MERKLE_PROOF_API}/${merkleTreeCid}/${hashedUUID}.json`;
      const response = await fetch(url);
      const claim = (await response.json()) as StringClaim;
      setLoading(false);
      if (claim === undefined) {
        setIsClaimable(false);
        return;
      }
      const [isClaimed] = await distributor.functions.isProven(
        campaignId,
        claim.index
      );
      setIsProofPresent(true);
      setIsClaimable(!isClaimed);
      setClaimableAmount(claim.amount);
    };

    switch (distributorType) {
      case "wallet":
        checkWalletState();
        break;
      case "wallet-nft":
        checkWalletNFTState();
        break;
      case "uuid":
        checkUUIDState();
        break;
      case "uuid-nft":
        checkUUIDNFTState();
        break;
    }
  }, [library, campaignId]);

  return { isClaimable, isProofPresent, claimableAmount, loading, error };
};
