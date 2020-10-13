import React from "react";
import { Link, Card, Text } from "rimble-ui";

const CreatedTokenInfo = ({path, name, vestingAmount}) => (
  <Link to={path} style={{textDecoration: 'none'}}>
    <Card color="black" p="1">
      <Text>{name}</Text>
      <Text>{vestingAmount}</Text>
    </Card>
  </Link>
)

export default CreatedTokenInfo
