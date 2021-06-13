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
import { Box, Button, Card, Modal, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import EtherscanLink from "../../../atoms/EtherscanLink";
import { TransactionStatus } from "@usedapp/core";
import theme from "../../../../theme/mui-theme";
import { BigNumber, ethers } from "ethers";
import { devTokenAddress } from "../../../pages/DevReceiverPage";
import { ProcessingTransactionIndicator } from "../ChargeRewardModal";

export interface RescueDEVModalProps {
  contractBalance: BigNumber | undefined;
  open: boolean;
  onCloseModal: () => void;
  rescue: (...args: any[]) => void;
  rescueStatus: TransactionStatus;
}

const RescueDEVModal: React.FC<RescueDEVModalProps> = ({
  contractBalance,
  open,
  onCloseModal,
  rescue,
  rescueStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (rescueStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully rescued.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={rescueStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
    onCloseModal();
  }, [rescueStatus]);

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
          <Typography variant="h4">Rescue DEV Token</Typography>
          <Box mt={2}>
            <Typography>You can rescue DEV token.</Typography>
          </Box>
          <Box mt={2}>
            <Typography color="error">
              Please be sure that if you rescue DEV token, <br /> rewards for
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
              color="primary"
              variant="outlined"
              onClick={() => {
                rescue(devTokenAddress);
              }}
            >
              Rescue
            </Button>
            <Button
              disabled={rescueStatus.status === "Mining"}
              variant="contained"
              onClick={() => {
                onCloseModal();
              }}
            >
              Close
            </Button>
          </Box>
          <ProcessingTransactionIndicator transactionState={rescueStatus} />
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

export default RescueDEVModal;
