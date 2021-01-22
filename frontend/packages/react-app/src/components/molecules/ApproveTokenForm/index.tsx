import React from "react";
import { Box, Button, FormControl, Input } from "@material-ui/core";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface ApproveTokenFormProps {
  readonly m: number;
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const ApproveTokenForm: React.FC<ApproveTokenFormProps> = ({
  m,
  distributorFormState,
  distributorFormDispatch,
}) => (
  <Box mt={m}>
    <Box mt={3}>
      <FormControl>
        <Input
          type="number"
          required
          placeholder="0.0"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            distributorFormDispatch({
              type: "approveAmount:set",
              payload: {
                approveAmount: event.target.value.toString(),
              },
            })
          }
          value={distributorFormState.approveAmount}
        />
      </FormControl>
    </Box>
    <Box mt={2}>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          distributorFormDispatch({
            type: "token:approve",
            payload: { approveRequest: true },
          });
        }}
      >
        Approve tokens
      </Button>
    </Box>
  </Box>
);

export default ApproveTokenForm;
