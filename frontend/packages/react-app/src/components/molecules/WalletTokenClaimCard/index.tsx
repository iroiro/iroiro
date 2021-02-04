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
import { Button, Card, CardContent, Typography, Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Dispatch, useCallback } from "react";
import TokenAmount from "../../atoms/TokenAmount";
import { uuidClaim, walletClaim } from "../../../utils/web3";
import { CampaignDetailAction } from "../../../reducers/campaignDetail";
import { DistributorTypes } from "../../../interfaces";

export interface WalletTokenClaimCardProps {
  campaignAddress: string;
  symbol: string;
  claimAmount: string;
  isClaimable: boolean;
  isClaimed: boolean;
  decimals: number;
  readonly dispatch: Dispatch<CampaignDetailAction>;
  merkleTreeCid: string;
  distributorType: DistributorTypes | string;
  hashedUUID: string;
}

const WalletTokenClaimCard: React.FC<WalletTokenClaimCardProps> = ({
  campaignAddress,
  symbol,
  claimAmount,
  isClaimable,
  isClaimed,
  decimals,
  dispatch,
  merkleTreeCid,
  distributorType,
  hashedUUID,
}) => {
  const { library } = useWeb3React();

  const onClickClaim = useCallback(async () => {
    let transaction;
    switch (distributorType) {
      case "wallet":
        transaction = await walletClaim(
          library,
          campaignAddress,
          merkleTreeCid
        );
        break;
      case "uuid":
        transaction = await uuidClaim(
          library,
          campaignAddress,
          merkleTreeCid,
          hashedUUID
        );
        break;
      default:
        console.error("Distributor type is not matched.");
        return;
    }

    if (transaction === undefined) {
      console.error("Transaction failed");
      return;
    }
    dispatch({ type: "isCampaignClaimed:setTrue" });
    console.debug(transaction);
    // TODO After approving finished, switch request button to enable
  }, [dispatch]);

  let text = "We are sorry but you can not claim token.";
  if (isClaimable) {
    text = "You can claim token.";
  }
  if (isClaimed) {
    switch (distributorType) {
      case "uuid":
        text = "This URL campaign has already been claimed.";
        break;
      default:
        text = "You claimed token.";
    }
  }
  return (
    <Card>
      <CardContent>
        <Box my={4}>
          <Typography align="center">{text}</Typography>
          {isClaimable && (
            <>
              <Box my={2}>
                <TokenAmount
                  amount={claimAmount}
                  decimals={decimals}
                  align="center"
                  variant="h2"
                  symbol={symbol}
                />
              </Box>
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
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletTokenClaimCard;
