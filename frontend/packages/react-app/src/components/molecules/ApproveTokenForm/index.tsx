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
import { Box, Button, FormControl, Input } from "@material-ui/core";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface ApproveTokenFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const ApproveTokenForm: React.FC<ApproveTokenFormProps> = ({
  distributorFormState,
  distributorFormDispatch,
}) => (
  <Box>
    <Box mt={3} mb={5}>
      <FormControl>
        <Input
          type="number"
          required
          placeholder="0.0"
          color="secondary"
          style={{
            marginRight: 8,
            width: 200,
          }}
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
      <Button
        color="secondary"
        variant="outlined"
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
