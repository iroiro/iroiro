import { Web3Provider } from "@ethersproject/providers";
import { CCTWalletCampaign__factory } from "../../../types";
import { ContractTransaction } from "@ethersproject/contracts";
import { useCallback } from "react";
import Web3 from "web3";
import { Sign } from "web3-core";

export const useClaim = (
  library: Web3Provider | undefined,
  campaignAddress: string,
  audiusLibs: any,
  toAddress: string
): (() => Promise<ContractTransaction | undefined>) => {
  return useCallback(async () => {
    if (
      !library ||
      campaignAddress === "" ||
      toAddress === "" ||
      audiusLibs.Account === undefined
    ) {
      return undefined;
    }
    if (audiusLibs.Account === undefined) {
      return;
    }
    const signer = library.getSigner();
    const campaign = CCTWalletCampaign__factory.connect(
      campaignAddress,
      signer
    );

    const account = await audiusLibs.Account.getCurrentUser();
    const fromAddress: string = account.wallet;
    const web3: Web3 = audiusLibs.web3Manager.web3;
    const toAddressHash: string = audiusLibs.web3Manager.web3.utils.soliditySha3(
      toAddress
    );
    const privateKey: string = web3.utils.bytesToHex(
      await audiusLibs.hedgehog.wallet.privKey
    );
    const signature: Sign = await web3.eth.accounts.sign(
      toAddressHash,
      privateKey
    );
    if (signature.messageHash === undefined) {
      return undefined;
    }

    return campaign
      .claim(
        toAddressHash,
        signature.r,
        signature.s,
        web3.utils.hexToNumber(signature.v),
        fromAddress,
        toAddress
      )
      .then((transaction) => {
        console.debug(transaction);
        return transaction;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }, [
    library,
    toAddress,
    campaignAddress,
    audiusLibs.Account,
    audiusLibs.web3Manager.web3,
    audiusLibs.hedgehog.wallet.privKey,
  ]);
};
