import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import { createCampaignState } from "../../../reducers/distributorForm";

export interface WaitingProcessDialogProps {
  readonly distributorFormState: createCampaignState;
}

const WaitingProcessDialog: React.FC<WaitingProcessDialogProps> = ({
  distributorFormState,
}) => {
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={distributorFormState.requestDeployCampaign}
    >
      <DialogTitle id="simple-dialog-title">
        Processing is in progress.
      </DialogTitle>
      <Box m={2} textAlign="center">
        <Typography>Please wait at the same screen.</Typography>
        <Box m={2}>
          <CircularProgress color="secondary" />
        </Box>
      </Box>
    </Dialog>
  );
};

export default WaitingProcessDialog;
