import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Flex, Text } from "rimble-ui";

const TokenListItem = ({ name, balance, symbol, address }) => (
  <Card color="black" mb={1}>
    <Flex m={1} style={{justifyContent: "space-between", alignItems: "center"}}>
      <Link to={`/token/${address}`} style={{textDecoration: 'none'}}>
        <Text fontSize="3" fontWeight="bold" color="itblue">{name}</Text>
      </Link>
      <Box>
        <Flex style={{ alignItems: "center"}}>
          <Text fontSize="4" mr={3} >{balance}</Text>
          <Text>{symbol}</Text>
        </Flex>
      </Box>
    </Flex>
  </Card>  
)

export default TokenListItem
