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

import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { createCampaignState } from "../../../reducers/distributorForm";
import { CampaignDetailState } from "../../../reducers/campaignDetail";

export interface WaitingProcessDialogProps {
  readonly state: createCampaignState | CampaignDetailState;
}

// TODO move as app wrapper if possible
const WaitingProcessDialog: React.FC<WaitingProcessDialogProps> = ({
  state,
}) => {
  const messages = () => {
    switch (state.dialog) {
      case "waiting-api":
        return ["It could take time if recipients are many."];
      case "creating-campaign":
        if (
          state.distributorType === "email" ||
          state.distributorType === "email-nft" ||
          state.distributorType === "uuid" ||
          state.distributorType === "uuid-nft"
        ) {
          return [
            "If you leave from a page, you lost campaign information for fans.",
            "And it could take time if Ethereum network is congested.",
          ];
        }
        return ["And it could take time if Ethereum network is congested."];
      default:
        return [];
    }
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={state.dialog !== "nothing"}
    >
      <DialogTitle id="simple-dialog-title">
        Processing is in progress.
      </DialogTitle>
      <Box m={2} textAlign="center">
        <Typography>Please wait at the same screen.</Typography>
        {messages().map((message, index) => (
          <Typography key={index}>{message}</Typography>
        ))}
        <Box m={2}>
          <CircularProgress color="secondary" />
        </Box>
      </Box>
    </Dialog>
  );
};

export default WaitingProcessDialog;
