import React from "react";
import { Button, Box, FormControl, Input } from "@material-ui/core";
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
            />
          </div>
        </MuiPickersUtilsProvider>
      </FormControl>
      <Box mt={3}>
        <Button
          variant="contained"
          color="secondary"
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
