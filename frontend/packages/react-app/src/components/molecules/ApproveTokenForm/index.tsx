import React from "react";
import { Box, Button, Form, Input } from "rimble-ui";
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
      <Form>
        <Input
          type="number"
          required
          width={1}
          placeholder="0"
          onChange={(event: any) =>
            distributorFormDispatch({
              type: "approveAmount:set",
              payload: { approveAmount: event.target.value.toString() },
            })
          }
          value={distributorFormState.approveAmount}
        />
      </Form>
      <Button
        mainColor="itblue"
        mt={2}
        width={1}
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
