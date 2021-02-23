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
import { Button, Box, FormControl, Input, TextField } from "@material-ui/core";
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
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaignForm: React.FC<SetupCampaignFormProps> = ({
  distributorFormDispatch,
  distributorFormState,
}) => (
  <Box>
    <Box mt={3} maxWidth={460}>
      <FormControl fullWidth>
        <Box mb={4}>
          <TextField
            fullWidth
            type="text"
            required
            label="Campaign Name"
            color="secondary"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              distributorFormDispatch({
                type: "campaignName:set",
                payload: { campaignName: event.target.value },
              })
            }
            value={distributorFormState.campaignName}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="text"
            required
            label="Description"
            color="secondary"
            variant="outlined"
            multiline
            rows={4}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              distributorFormDispatch({
                type: "campaignName:set",
                payload: { campaignName: event.target.value },
              })
            }
            value={""}
          />
        </Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateInputWrapper>
            <div style={{ marginRight: 16 }}>
              <KeyboardDatePicker
                margin="normal"
                color="secondary"
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
            <div>
              <KeyboardDatePicker
                margin="normal"
                color="secondary"
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
              {distributorFormState.startDate >=
                distributorFormState.endDate && (
                <FormHelperText style={{ color: "#f00", marginTop: -4 }}>
                  End date must be after Start date.
                </FormHelperText>
              )}
            </div>
          </DateInputWrapper>
        </MuiPickersUtilsProvider>
      </FormControl>
    </Box>
  </Box>
);

const DateInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export default SetupCampaignForm;
