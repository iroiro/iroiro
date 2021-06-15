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
import {
  Box,
  Button,
  Card,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import EtherscanLink from "../../../atoms/EtherscanLink";
import { Currency, TransactionStatus } from "@usedapp/core";
import theme from "../../../../theme/mui-theme";
import { BigNumber, ethers } from "ethers";
import { ProcessingTransactionIndicator } from "../ChargeRewardModal";

export interface WithdrawRewardModalProps {
  amountToBurn: string;
  setAmountToBurn: (amount: string) => void;
  communityToken: Currency;
  ctAllowance: BigNumber | undefined;
  ctBalance: BigNumber | undefined;
  devReceiverAddress: string;
  open: boolean;
  onCloseModal: () => void;
  approve: (...args: any[]) => void;
  approveStatus: TransactionStatus;
  withdrawReward: (...args: any[]) => void;
  withdrawRewardStatus: TransactionStatus;
}

const WithdrawRewardModal: React.FC<WithdrawRewardModalProps> = ({
  amountToBurn,
  setAmountToBurn,
  communityToken,
  ctAllowance,
  ctBalance,
  devReceiverAddress,
  open,
  onCloseModal,
  approve,
  approveStatus,
  withdrawReward,
  withdrawRewardStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const isInsufficientBalance = BigNumber.from(
    amountToBurn === ""
      ? "0"
      : ethers.utils.parseUnits(amountToBurn, communityToken.decimals)
  ).gt(ctBalance ?? BigNumber.from(0));

  useEffect(() => {
    if (approveStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully approved.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={approveStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
  }, [approveStatus]);

  useEffect(() => {
    if (withdrawRewardStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully withdrew.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={withdrawRewardStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
    onCloseModal();
  }, [withdrawRewardStatus]);

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledCard>
        <Box p={4} mb={3}>
          <Typography variant="h4">Withdraw Reward</Typography>
          <Box mt={2}>
            <Typography>
              You can withdraw reward by burning community tokens.
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              error={isInsufficientBalance}
              value={amountToBurn}
              type="number"
              inputProps={{ max: "2000", step: "any" }}
              onChange={(e) => {
                setAmountToBurn(e.target.value);
              }}
              helperText={
                isInsufficientBalance
                  ? "Insufficient balance"
                  : `$${communityToken.ticker} amount to burn`
              }
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setAmountToBurn(
                  ethers.utils.formatUnits(
                    ctBalance ?? "0",
                    communityToken.decimals
                  )
                );
              }}
            >
              Max
            </Button>
            <Typography>
              Your community token balance:{" "}
              {ethers.utils.formatEther(ctBalance ?? "0")} $
              {communityToken.ticker}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                approve(
                  devReceiverAddress,
                  ethers.utils.parseUnits(amountToBurn, communityToken.decimals)
                );
              }}
              disabled={
                isInsufficientBalance ||
                approveStatus.status === "Mining" ||
                withdrawRewardStatus.status === "Mining" ||
                ethers.utils
                  .parseUnits(
                    amountToBurn === "" ? "0" : amountToBurn,
                    communityToken.decimals
                  )
                  .isZero()
              }
            >
              Approve
            </Button>
          </Box>
          <Box mt={2}>
            <Typography>
              {ctAllowance === undefined || ctAllowance.isZero()
                ? "You have to approve community tokens to burn to withdraw the reward."
                : "Now you can withdraw the reward."}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              disabled={
                ctAllowance === undefined ||
                ctAllowance.isZero() ||
                approveStatus.status === "Mining" ||
                withdrawRewardStatus.status === "Mining"
              }
              color="secondary"
              variant="contained"
              onClick={() => {
                withdrawReward(
                  ctAllowance?.gte(ctBalance ?? "0") ? ctBalance : ctAllowance
                );
              }}
            >
              Withdraw Reward
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              disabled={
                approveStatus.status === "Mining" ||
                withdrawRewardStatus.status === "Mining"
              }
              variant="contained"
              onClick={() => {
                onCloseModal();
              }}
            >
              Close
            </Button>
          </Box>
          <ProcessingTransactionIndicator transactionState={approveStatus} />
          <ProcessingTransactionIndicator
            transactionState={withdrawRewardStatus}
          />
        </Box>
      </StyledCard>
    </Modal>
  );
};

const StyledCard = styled(Card)`
  ${theme.breakpoints.down(600)} {
    width: 80%;
  }
`;

export default WithdrawRewardModal;
