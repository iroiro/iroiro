import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Flex, Text } from "rimble-ui";

export interface TokenListItemProps {
  readonly color: string;
  readonly name: string;
  readonly address: string;
}

const TokenListItem = ({ color, name, address }: TokenListItemProps) => (
  <Card color="black" mb={1}>
    <Flex
      m={1}
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Link to={`/token/${address}`} style={{ textDecoration: "none" }}>
        <Text fontSize="3" fontWeight="bold" color={color}>
          {name}
        </Text>
      </Link>
    </Flex>
  </Card>
);

export default TokenListItem;
