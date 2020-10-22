import React from "react"
import {
  Heading,
  Text,
  Box,
  Card,
  Flex,
  Button
} from "rimble-ui"

const CheckClaimable = ({
  checkAudiusStatus
}) => (
  <Card mt={2}>
    <Heading as={"h2"} mt={0}>Step 02: Check status</Heading>
    <Button onClick={checkAudiusStatus}>Check</Button>
  </Card>
)

export default CheckClaimable
