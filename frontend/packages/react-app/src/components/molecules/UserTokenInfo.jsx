import React from "react"
import {
  Heading,
  Text,
  Box,
  Card,
  Flex,
  Button
} from "rimble-ui"

const UserTokenInfo = ({
  tokenInfo
}) => (
  <Card mt={2}>
    <Heading as={"h2"} mt={0}>Token info</Heading>
    <Flex>
      <Box>
        <Text>Name:</Text>
        <Text fontSize={3} fontWeight="bold">{tokenInfo.name}</Text>
      </Box>
      <Box ml={3}>
        <Text>Symbol:</Text>
        <Text fontSize={3} fontWeight="bold">{tokenInfo.symbol}</Text>
      </Box>
    </Flex>
    <Box mt={2}>
      <Text>Address:</Text>
      <Text fontSize={3} fontWeight="bold">{tokenInfo.address}</Text>
    </Box>
    <Box mt={2}>
      <Text>Balance:</Text>
      <Flex style={{ alignItems: "center" }}>
        <Text fontSize={5} fontWeight="bold">{tokenInfo.balance}</Text>
      </Flex>
    </Box>
  </Card>
)

export default UserTokenInfo
