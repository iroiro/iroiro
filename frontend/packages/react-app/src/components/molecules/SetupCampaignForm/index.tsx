import React from "react";
import { Box, Text, Button, Form, Input } from "rimble-ui";

export interface NumberProps {
  readonly m: number;
}

const SetupCampaignForm: React.FC<NumberProps> = ({ m }: NumberProps) => (
  <Box>
    <Text fontSize={3} fontWeight="bold">
      2. Setup basic info
    </Text>
    <Box mt={3}>
      <Form>
        <Input
          mb={2}
          type="text"
          required
          width={1}
          placeholder="Campaign Name"
        />
        <Input mb={2} type="number" required width={1} placeholder="100000" />
        <Input mb={2} type="text" required width={1} placeholder="2020/10/10" />
      </Form>
      <Button mainColor="itblue" mt={2} width={1}>
        Start
      </Button>
    </Box>
  </Box>
);

export default SetupCampaignForm;
