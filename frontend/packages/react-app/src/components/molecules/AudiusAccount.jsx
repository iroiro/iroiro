import React from "react";
import {
  Heading,
  Text,
  Box,
} from "rimble-ui";

const AudiusInfo = ({
  myAccount,
}) => (
  <Box>
    <Heading as={"h2"}>Audius account info</Heading>
    <Box>
      <Text>{myAccount.name}</Text>
      <Text>{`@${myAccount.handle}`}</Text>
      <Text>{myAccount.wallet}</Text>
      <Text>{myAccount.balance}</Text>
    </Box>
  </Box>
)

export default AudiusInfo