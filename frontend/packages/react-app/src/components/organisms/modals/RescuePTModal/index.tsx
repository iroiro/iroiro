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
import { Currency, TransactionStatus } from "@usedapp/core";
import theme from "../../../../theme/mui-theme";
import { BigNumber, ethers } from "ethers";
import { ProcessingTransactionIndicator } from "../ChargeRewardModal";

export interface RescuePTModalProps {
  contractBalance: BigNumber | undefined;
  token: Currency;
  propertyTokenAddress: string;
  open: boolean;
  onCloseModal: () => void;
  rescue: (...args: any[]) => void;
  rescueStatus: TransactionStatus;
}

const RescuePTModal: React.FC<RescuePTModalProps> = ({
  contractBalance,
  token,
  propertyTokenAddress,
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
          <Typography variant="h4">Rescue Property Token</Typography>
          <Box mt={2}>
            <Typography>You can rescue ${token.ticker} tokens.</Typography>
          </Box>
          <Box mt={2}>
            <Typography color="error">
              Please be sure that if you rescue property tokens,
              <br /> no more rewards are not going to be allocated to community
              token holders.
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography>
              Current contract balance:
              {ethers.utils.formatEther(contractBalance ?? "0")} ${token.ticker}
            </Typography>
          </Box>
          <Box
            style={{ display: "flex", justifyContent: "space-around" }}
            mt={2}
            textAlign="center"
          >
            {" "}
            <Button
              disabled={rescueStatus.status === "Mining"}
              color="primary"
              variant="outlined"
              onClick={() => {
                rescue(propertyTokenAddress);
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

export default RescuePTModal;
