import React from "react";
import {
  Text,
  Box,
  Button,
} from "rimble-ui";

const AudiusWithdrawToken = ({
  distributedAmount,
  withdrawToken
}) => (
  <Box>
    <Text>Balance: {distributedAmount}</Text>
    <Button onClick={withdrawToken}>Withdraw tokens</Button>
  </Box>
)

export default AudiusWithdrawToken