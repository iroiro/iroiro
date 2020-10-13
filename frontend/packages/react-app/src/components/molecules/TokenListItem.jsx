import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Flex, Text } from "rimble-ui";

const TokenListItem = ({ name, balance, symbol, address }) => (
  <Link to={`/token/${address}`} style={{textDecoration: 'none'}}>
    <Card color="black" p="1">
      <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
        <Text>{name}</Text>
        <Box>
          <Flex style={{ alignItems: "flex-end"}}>
            <Text fontSize="5" mr="3" >{balance}</Text>
            <Text pb="2">{symbol}</Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  </Link>
)

export default TokenListItem
