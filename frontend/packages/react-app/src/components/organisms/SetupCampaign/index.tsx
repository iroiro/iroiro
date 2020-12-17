import React from "react";
import { Card, Box } from "rimble-ui";
import SetupCampaignForm from "../../molecules/SetupCampaignForm";
import {
  createCampaignState,
  DISTRIBUTOR_ACTIONS,
} from "../../../reducers/distributorForm";

export interface SetupCampaignFormProps {
  readonly distributorFormState: createCampaignState;
  distributorFormDispatch: React.Dispatch<DISTRIBUTOR_ACTIONS>;
}

const SetupCampaign: React.FC<SetupCampaignFormProps> = ({
  distributorFormState,
  distributorFormDispatch,
}) => (
  <Card mt={2}>
    <Box m={"auto"} width={[3 / 4]}>
      <SetupCampaignForm
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
      />
    </Box>
  </Card>
);

export default SetupCampaign;
