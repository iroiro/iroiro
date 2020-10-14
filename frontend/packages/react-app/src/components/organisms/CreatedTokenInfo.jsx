import React from "react";
import { Card, Text, Button } from "rimble-ui";
import { Link } from 'react-router-dom'

const CreatedTokenInfo = ({token, withdrawToken}) => (
    <Card color="black" p="1">
      <Link to={`token/${token.address}`} style={{textDecoration: 'none'}}>
        <Text fontWeight={"bold"}>{token.name}</Text>
      </Link>
      <Text>{token.address}</Text>
      <Text>{token.vestingAmount} {token.symbol}</Text>
      <Button onClick={withdrawToken}>Withdraw</Button>
    </Card>
)

export default CreatedTokenInfo
