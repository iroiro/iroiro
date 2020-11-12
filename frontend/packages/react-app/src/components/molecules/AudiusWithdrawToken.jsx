import React from "react";
import {
  Text,
  Card,
  Button,
  Heading,
  Flex,
} from "rimble-ui";

const AudiusWithdrawToken = ({
  distributedAmount,
  withdrawToken,
  tokenInfo
}) => (
  <Card mt={2}>
    <Heading as={"h2"} mt={0}>Step 03: Withdrawable amount</Heading>
    <Flex style={{alignItems: "center"}}>
      <Text fontSize={5} fontWeight="bold">{distributedAmount}</Text>
      <Text fontSize={2} fontWeight="bold">{tokenInfo.decimals}</Text>
    </Flex>
    <Button mt={3} onClick={withdrawToken}>Withdraw tokens</Button>
  </Card>
)

export default AudiusWithdrawToken