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

import * as React from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Dispatch, useCallback } from "react";
import {
  uuidClaim,
  uuidNFTClaim,
  walletClaim,
  walletNFTClaim,
} from "../../../utils/web3";
import {
  CampaignDetailAction,
  CampaignDetailState,
} from "../../../reducers/campaignDetail";
import { DistributorTypes } from "../../../interfaces";
import EtherscanLink from "../../atoms/EtherscanLink";

// TODO Replace props with simply state
export interface NFTClaimCardProps {
  readonly campaignId: string;
  readonly isClaimable: boolean;
  readonly isClaimed: boolean;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  readonly merkleTreeCid: string;
  readonly distributorAddress: string;
  readonly distributorType: DistributorTypes | string;
  readonly state: CampaignDetailState;
}

const NFTClaimCard: React.FC<NFTClaimCardProps> = ({
  campaignId,
  isClaimable,
  isClaimed,
  dispatch,
  merkleTreeCid,
  distributorAddress,
  distributorType,
  state,
}) => {
  const { library } = useWeb3React();

  const onClickClaim = useCallback(async () => {
    dispatch({ type: "dialog:set", payload: { dialog: "claim" } });
    let transaction;
    switch (distributorType) {
      case "wallet-nft":
        transaction = await walletNFTClaim(
          library,
          distributorAddress,
          campaignId,
          merkleTreeCid
        );
        break;
      case "uuid-nft":
        transaction = await uuidNFTClaim(
          library,
          distributorAddress,
          campaignId,
          merkleTreeCid,
          state.uuid,
          state.hashedUUID
        );
        break;
    }

    dispatch({ type: "dialog:set", payload: { dialog: "nothing" } });
    if (transaction === undefined) {
      console.error("Transaction failed");
      alert(
        "There was an error or you rejected transaction. Please try again later."
      );
      return;
    }
    dispatch({ type: "isCampaignClaimed:setTrue" });
    dispatch({
      type: "transactionHash:set",
      payload: { transactionHash: transaction.hash },
    });
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [dispatch, library]);

  let text = "We are sorry but you can not claim NFT.";
  if (isClaimable) {
    text = "You can claim NFT.";
  }
  if (isClaimed) {
    switch (distributorType) {
      case "uuid-nft":
        text = "This URL campaign has already been claimed.";
        break;
      default:
        text = "You claimed NFT.";
    }
  }

  return (
    <Box p={4}>
      <Box my={4}>
        <Typography align="center">{text}</Typography>
        {isClaimable && (
          <>
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                disabled={isClaimed}
                onClick={onClickClaim}
              >
                {isClaimed ? "Claimed" : "Claim"}
              </Button>
            </Box>
            <Box mt={2} textAlign="center">
              <EtherscanLink
                type="tx"
                addressOrTxHash={state.transactionHash}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default NFTClaimCard;
