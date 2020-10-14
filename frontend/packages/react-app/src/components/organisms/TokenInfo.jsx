import React from "react";
import { Heading, Box, Text, Field, Button, Input, Flex } from "rimble-ui";

const TokenInfo = ({ token, stakingInfo, withdrawEarnedToken, stakeToken, handleStakeInput, stakeValue }) => (
  <div>
    <Heading as={"h1"}>{token.name}</Heading>
    <Heading as={"h2"}>Basic Info</Heading>
    <Box>
      <Text>Symbol: {token.symbol}</Text>
      <Text>Decimals: {token.decimals}</Text>
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
      <Text>Your staking amount: {stakingInfo.stakingAmount}</Text>
      <Text>Your earned amount: {stakingInfo.earned}</Text>
    </Box>
    <Flex style={{ alignItems: "center"}}>
      <Text>{stakingInfo.earned} {token.symbol}</Text>
      <Button onClick={withdrawEarnedToken}>Withdraw</Button>
    </Flex>

    <Box>
      <Field label="Stake now">
        <Flex>
          <Input
            type="number"
            onChange={(event)=>handleStakeInput(event.target.value)}
            value={stakeValue}
            placeholder={`100,000`}
          />
          <Button onClick={stakeToken}>Stake</Button>
        </Flex>
      </Field>
    </Box>
  </div>
)

export default TokenInfo
