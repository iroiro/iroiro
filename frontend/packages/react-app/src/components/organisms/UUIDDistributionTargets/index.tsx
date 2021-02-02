import * as React from "react";
import { Box, Typography, Card, Button, TextField } from "@material-ui/core";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";

export interface TargetsProps {
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

// TODO add input form
const UUIDDistributionTargets: React.FC<TargetsProps> = ({
  uuidState,
  uuidDispatch,
  distributorFormDispatch,
}) => (
  <>
    <Card>
      <Box p={4}>
        <Box mt={4}>
          <Typography variant={"h4"}>
            1. Input distribution target quantity
          </Typography>
        </Box>
        <>
          <Box my={4} style={{ textAlign: "center" }}>
            <Typography>Distribution target quantity</Typography>
          </Box>
          <Box my={2} style={{ textAlign: "center" }}>
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                uuidDispatch({
                  type: "quantity:set",
                  payload: { quantity: event.target.value },
                })
              }
              placeholder="100"
              type="number"
              inputProps={{ min: 1 }}
              value={uuidState.quantity}
            />
          </Box>
          <Box my={5} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={!uuidState.isValidQuantity}
              onClick={() => {
                uuidDispatch({ type: "targets:generate" });
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Next
            </Button>
          </Box>
        </>
      </Box>
    </Card>
  </>
);

export default UUIDDistributionTargets;
