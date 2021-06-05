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

export interface ChargeRewardModalProps {
  chargeableReward: BigNumber | undefined;
  open: boolean;
  onCloseModal: () => void;
  chargeReward: (...args: any[]) => void;
  chargeRewardStatus: TransactionStatus;
}

const ChargeRewardModal: React.FC<ChargeRewardModalProps> = ({
  chargeableReward,
  open,
  onCloseModal,
  chargeReward,
  chargeRewardStatus,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (chargeRewardStatus.status !== "Success") {
      return;
    }
    enqueueSnackbar("Successfully charged.", {
      variant: "success",
      action: (
        <div style={{ color: "white" }}>
          <EtherscanLink
            type="tx"
            addressOrTxHash={chargeRewardStatus.transaction?.hash ?? ""}
            small={true}
            textColor="inherit"
          />
        </div>
      ),
    });
    onCloseModal();
  }, [chargeRewardStatus]);

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
          <Typography variant="h4">Charge Reward</Typography>
          <Box mt={2}>
            <Typography>You can charge to maximize reward.</Typography>
          </Box>
          <Box mt={2}>
            <Typography>
              Chargeable reward:{" "}
              {ethers.utils.formatEther(chargeableReward ?? "0")} $DEV
            </Typography>
          </Box>
          <Box mt={2}>
            <Button
              disabled={chargeRewardStatus.status === "Mining"}
              color="secondary"
              variant="contained"
              onClick={() => {
                chargeReward();
              }}
            >
              Charge Reward
            </Button>
            <Button
              disabled={chargeRewardStatus.status === "Mining"}
              variant="contained"
              onClick={() => {
                onCloseModal();
              }}
            >
              Close
            </Button>
          </Box>
          {chargeRewardStatus.status === "Mining" && (
            <>
              <Box mt={2}>
                <CircularProgress color="secondary" />
              </Box>
              <EtherscanLink
                type="tx"
                addressOrTxHash={chargeRewardStatus.transaction?.hash ?? ""}
              />
            </>
          )}
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

export default ChargeRewardModal;
