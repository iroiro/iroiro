import React from "react";
import { Box, Text, Button, Form, Input } from "rimble-ui";

export interface NumberProps {
  readonly m: number;
}

const DepositTokenForm: React.FC<NumberProps> = ({ m }) => (
  <Box mt={m}>
    <Text fontSize={3} fontWeight="bold">
      1. Deposit your tokens
    </Text>
    <Box mt={3}>
      <Form>
        <Input type="number" required width={1} placeholder="0" />
      </Form>
      <Button mainColor="itblue" mt={2} width={1}>
        Transfer tokens
      </Button>
    </Box>
  </Box>
);

export default DepositTokenForm;
