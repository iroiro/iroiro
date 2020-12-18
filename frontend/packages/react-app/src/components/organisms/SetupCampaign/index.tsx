import React from "react";
import { Card, Box, Heading, Button } from "rimble-ui";
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
      <Heading>3. Setup basic info</Heading>
      <SetupCampaignForm
        distributorFormDispatch={distributorFormDispatch}
        distributorFormState={distributorFormState}
      />
    </Box>
    <Box my={4} style={{ textAlign: "center" }}>
      <Button.Outline
        mainColor="gray"
        onClick={() => {
          distributorFormDispatch({
            type: "step:set",
            payload: { stepNo: 2 },
          });
        }}
      >
        Back
      </Button.Outline>
    </Box>
  </Card>
);

export default SetupCampaign;
