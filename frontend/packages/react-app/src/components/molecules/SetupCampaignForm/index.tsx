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
import { Button, Box, FormControl, Input } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaignForm: React.FC<SetupCampaignFormProps> = ({
  distributorFormDispatch,
  distributorFormState,
}) => (
  <Box>
    <Box mt={3}>
      <FormControl fullWidth>
        <Box mb={2}>
          <Input
            fullWidth
            type="text"
            required
            placeholder="Campaign Name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              distributorFormDispatch({
                type: "campaignName:set",
                payload: { campaignName: event.target.value },
              })
            }
            value={distributorFormState.campaignName}
          />
        </Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{ marginTop: 18 }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={distributorFormState.startDate}
              onChange={(date: MaterialUiPickersDate) =>
                distributorFormDispatch({
                  type: "startDate:set",
                  payload: { startDate: date },
                })
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={distributorFormState.endDate}
              onChange={(date: MaterialUiPickersDate) =>
                distributorFormDispatch({
                  type: "endDate:set",
                  payload: { endDate: date },
                })
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              error={
                distributorFormState.startDate >= distributorFormState.endDate
              }
            />
            {distributorFormState.startDate >= distributorFormState.endDate && (
              <FormHelperText style={{ color: "#f00", marginTop: -4 }}>
                End date must be after Start date.
              </FormHelperText>
            )}
          </div>
        </MuiPickersUtilsProvider>
      </FormControl>
      <Box mt={3} textAlign={"center"}>
        <Button
          variant="contained"
          color="secondary"
          disabled={
            distributorFormState.startDate >= distributorFormState.endDate ||
            distributorFormState.campaignName === ""
          }
          onClick={() => {
            distributorFormDispatch({
              type: "campaign:deploy",
              payload: { requestDeployCampaign: true },
            });
          }}
        >
          Start Campaign
        </Button>
      </Box>
    </Box>
  </Box>
);

export default SetupCampaignForm;
