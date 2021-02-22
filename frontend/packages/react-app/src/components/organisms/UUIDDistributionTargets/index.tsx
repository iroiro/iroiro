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
import { Box, Typography, Card, Button, TextField } from "@material-ui/core";
import { DISTRIBUTOR_ACTIONS } from "../../../reducers/distributorForm";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";

export interface TargetsProps {
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
  readonly distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const upperLimit = Number.parseInt(
  process.env?.REACT_APP_TARGETS_UPPER_LIMIT ?? "0"
);

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
          <Typography variant={"h4"}>1. Input number of unique URLs</Typography>
        </Box>
        <>
          <Box my={4} style={{ textAlign: "center" }}>
            <Typography>Number of unique URLs(up to {upperLimit})</Typography>
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
              inputProps={{
                min: 1,
                max: upperLimit,
              }}
              value={uuidState.quantity}
            />
            {upperLimit < uuidState.quantity && (
              <Box mt={1}>
                <Typography color={"error"}>
                  Input number exceeds upper limit.
                </Typography>
              </Box>
            )}
          </Box>
          <Box my={5} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={
                uuidState.quantity <= 0 || upperLimit < uuidState.quantity
              }
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
