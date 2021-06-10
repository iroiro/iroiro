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
  CircularProgress,
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

export interface DepositPTModalProps {
  amountToDeposit: string;
  setAmountToDeposit: (amount: string) => void;
  devReceiverAddress: string;
  propertyToken: Currency;
  ptBalance: BigNumber | undefined;
  open: boolean;
  onCloseModal: () => void;
  depositPT: (...args: any[]) => void;
  depositPTStatus: TransactionStatus;
}

const DepositPTModal: React.FC<DepositPTModalProps> = ({
  amountToDeposit,
  setAmountToDeposit,
  devReceiverAddress,
  propertyToken,
  ptBalance,
  open,
  onCloseModal,
  depositPT,
  depositPTStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const isInsufficientBalance = BigNumber.from(
    amountToDeposit === ""
      ? "0"
      : ethers.utils.parseUnits(amountToDeposit, propertyToken.decimals)
  ).gt(ptBalance ?? BigNumber.from(0));

  useEffect(() => {
    if (depositPTStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully deposited.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={depositPTStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
  }, [depositPTStatus]);

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
          <Typography variant="h4">Deposit Property Token</Typography>
          <Box mt={2}>
            <Typography>You can deposit Property Token.</Typography>
          </Box>
          <Box mt={2}>
            <Typography>
              Your property token balance:{" "}
              {ethers.utils.formatEther(ptBalance ?? "0")} $
              {propertyToken.ticker}
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              error={isInsufficientBalance}
              helperText={
                isInsufficientBalance
                  ? "Insufficient balance"
                  : `$${propertyToken.ticker} amount to deposit`
              }
              value={amountToDeposit}
              type="number"
              onChange={(e) => {
                setAmountToDeposit(e.target.value);
              }}
            />
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "space-around" }}
            mt={2}
            textAlign="center"
          >
            <Button
              disabled={
                isInsufficientBalance ||
                depositPTStatus.status === "Mining" ||
                ethers.utils
                  .parseEther(amountToDeposit === "" ? "0" : amountToDeposit)
                  .isZero()
              }
              color="secondary"
              variant="contained"
              onClick={() => {
                depositPT(
                  devReceiverAddress,
                  ethers.utils.parseEther(amountToDeposit)
                );
              }}
            >
              Deposit
            </Button>
            <Button
              disabled={depositPTStatus.status === "Mining"}
              variant="contained"
              onClick={() => {
                onCloseModal();
              }}
            >
              Close
            </Button>
          </Box>
          <ProcessingTransactionIndicator transactionState={depositPTStatus} />
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

export default DepositPTModal;
