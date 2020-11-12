import React from "react";
import {
  Heading,
  Text,
  Box,
  Card,
  Flex,
  Avatar,
} from "rimble-ui";

const AudiusInfo = ({
  myAccount,
}) => (
  <Card>
    <Heading as={"h2"} mt={0}>Audius account info</Heading>
    <Flex style={{ alignItems: "center" }}>
      <Avatar
        size="100px"
        src={`https://cloudflare-ipfs.com/ipfs/${myAccount.profile_picture_sizes}/150x150.jpg`}
      />
      <Box ml={4}>
      {/* profile_picture_sizes */}
      {/* https://cloudflare-ipfs.com/ipfs/QmaRHy3jHNr9W2CyLxirNwsiSGBDpHEYBWGkCQ7RYfw2LG/150x150.jpg */}
        <Text fontWeight="bold">{myAccount.name}</Text>
        <Text mt={1}>{`@${myAccount.handle}`}</Text>
        <Text mt={1}>{myAccount.wallet}</Text>
        <Text mt={1} fontWeight="bold">{myAccount.balance} ETH</Text>
      </Box>
    </Flex>
  </Card>
)

export default AudiusInfo