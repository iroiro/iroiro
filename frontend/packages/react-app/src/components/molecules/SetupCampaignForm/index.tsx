import React from "react";
import { Box, Button, Form, Input } from "rimble-ui";
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
      <Form>
        <Input
          mb={2}
          type="text"
          required
          width={1}
          placeholder="Campaign Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            distributorFormDispatch({
              type: "campaignName:set",
              payload: { campaignName: event.target.value },
            })
          }
          value={distributorFormState.campaignName}
        />
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
      </Form>
      <Button
        mainColor="itblue"
        mt={3}
        width={1}
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
);

export default SetupCampaignForm;
