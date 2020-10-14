import React from "react";
import { Heading, Box, Text, Button, Input } from "rimble-ui";

const TokenInfo = ({ token }) => (
  <div>
    <Heading as={"h1"}>{token.name}</Heading>
    <Heading as={"h2"}>Basic Info</Heading>
    <Box>
      <Text>Symbol: {token.symbol}</Text>
      <Text>Decimmals: {token.decimals}</Text>
      <Text>Total Supply: {token.totalSupply}</Text>
      <Button as="a" href={`https://ropsten.etherscan.io/address/${token.address}`} target="\_blank">View in Etherscan</Button>
    </Box>
    <Heading as={"h2"}>Allocation</Heading>
    <Box>
      <Text>Team: 000%</Text>
      <Text>Lockup period: 000year</Text>
    </Box>
    <Heading as={"h2"}>Staking</Heading>
    <Box>
      <Text>Your balance: {token.balance}</Text>
      <Text>Your staking amount: </Text>
      <Text>Your earned amount: </Text>
    </Box>
    <Input type="text" required={true} placeholder={`100,000`} />
    <Button>Stake</Button>
  </div>
)

export default TokenInfo
