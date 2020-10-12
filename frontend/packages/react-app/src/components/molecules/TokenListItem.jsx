import React from "react";
import { Box, Card, Flex, Text , Link} from "rimble-ui";

const TokenListItem = ({ path, name, balance, symbol }) => (
  <Link to={path} style={{textDecoration: 'none'}}>
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
