import React from "react";
import { Link } from "react-router-dom";
import { Card, Flex, Text } from "rimble-ui";

export interface TokenListItemProps {
  readonly name: string;
  readonly address: string;
  readonly color: string;
  readonly type: string;
}

const TokenListItem: React.FC<TokenListItemProps> = ({
  name,
  address,
  type,
  color,
}) => (
  <Card color="black" mb={1}>
    <Flex
      m={1}
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      {type === "dashboard" && (
        <Link to={`/dashboard/${address}`} style={{ textDecoration: "none" }}>
          <Text fontSize="3" fontWeight="bold" color={color}>
            {name}
          </Text>
        </Link>
      )}
      {type === "explore" && (
        <Link to={`/explore/${address}`} style={{ textDecoration: "none" }}>
          <Text fontSize="3" fontWeight="bold" color={color}>
            {name}
          </Text>
        </Link>
      )}
    </Flex>
  </Card>
);

export default TokenListItem;
