import React from "react";
import { Box, Text, Table, Button, Form, Input } from "rimble-ui";

const DepositTokenForm = (m: number) => (
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
