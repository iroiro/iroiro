import React from "react";
import { Card, Box, Typography, Button } from "@material-ui/core";
import SetupCampaignForm from "../../molecules/SetupCampaignForm";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";
import WaitingProcessDialog from "../../molecules/WaitingProcessDialog";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaign: React.FC<SetupCampaignFormProps> = ({
  distributorFormState,
  distributorFormDispatch,
}) => {
  return (
    <Box mt={2}>
      <Card>
        <Box p={4}>
          <Box m={"auto"} width={[3 / 4]}>
            <Typography variant={"h3"}>3. Setup basic info</Typography>
            <SetupCampaignForm
              distributorFormDispatch={distributorFormDispatch}
              distributorFormState={distributorFormState}
            />
          </Box>
          <Box my={4} style={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="default"
              onClick={() => {
                distributorFormDispatch({
                  type: "step:set",
                  payload: { stepNo: 2 },
                });
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Card>
      <WaitingProcessDialog distributorFormState={distributorFormState} />
    </Box>
  );
};

export default SetupCampaign;
