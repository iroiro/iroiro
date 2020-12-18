import React from "react";
import { Card, Box } from "rimble-ui";
import SetupCampaignForm from "../../molecules/SetupCampaignForm";

const SetupCampaign: React.FC = () => (
  <Card mt={2}>
    <Box m={"auto"} width={[3 / 4]}>
      <SetupCampaignForm m={4} />
    </Box>
  </Card>
);

export default SetupCampaign;
