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
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import EtherscanLink from "../../../atoms/EtherscanLink";
import { TransactionStatus } from "@usedapp/core";
import theme from "../../../../theme/mui-theme";
import { BigNumber, ethers } from "ethers";
import { devTokenAddress } from "../../../pages/DevReceiverPage";
import { ProcessingTransactionIndicator } from "../ChargeRewardModal";

export interface WithdrawDEVModalProps {
  contractBalance: BigNumber | undefined;
  open: boolean;
  onCloseModal: () => void;
  withdraw: (...args: any[]) => void;
  withdrawStatus: TransactionStatus;
}

const WithdrawDEVModal: React.FC<WithdrawDEVModalProps> = ({
  contractBalance,
  open,
  onCloseModal,
  withdraw,
  withdrawStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (withdrawStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully withdrew.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={withdrawStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
    onCloseModal();
  }, [withdrawStatus]);

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
          <Typography variant="h4">Withdraw DEV Token</Typography>
          <Box mt={2}>
            <Typography>You can withdraw DEV token.</Typography>
            <Typography>
              Please be sure that if you withdraw DEV token, <br /> rewards for
              Community token holders are lost.
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography>
              Current contracts balance:{" "}
              {ethers.utils.formatEther(contractBalance ?? "0")} $DEV
            </Typography>
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "space-around" }}
            mt={2}
            textAlign="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                withdraw(devTokenAddress);
              }}
            >
              Withdraw
            </Button>
            <Button
              disabled={withdrawStatus.status === "Mining"}
              variant="contained"
              onClick={() => {
                onCloseModal();
              }}
            >
              Close
            </Button>
          </Box>
          <ProcessingTransactionIndicator transactionState={withdrawStatus} />
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

export default WithdrawDEVModal;
