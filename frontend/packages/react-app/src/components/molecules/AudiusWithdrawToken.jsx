import React from "react";
import {
  Text,
  Card,
  Button,
} from "rimble-ui";

const AudiusWithdrawToken = ({
  distributedAmount,
  withdrawToken
}) => (
  <Card mt={2}>
    <Text>Step 03: Withdrawable amount:</Text>
    <Text fontSize={5} fontWeight="bold">{distributedAmount}</Text>
    <Button mt={3} onClick={withdrawToken}>Withdraw tokens</Button>
  </Card>
)

export default AudiusWithdrawToken