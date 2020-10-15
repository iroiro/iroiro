import React from "react";
import { Heading, Box, Text, Field, Button, Input, Flex } from "rimble-ui";

const TokenInfo = ({ token, stakingInfo, withdrawStakingToken, claimEarnedToken, approve, stakeToken, handleStakeInput, stakeValue }) => (
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
      <Text>Team: {token.creatorTokenRatio}</Text>
      <Text>Community: {100 - token.creatorTokenRatio}</Text>
      <Text>Lockup period: {token.lockupPeriod}year</Text>
    </Box>
    <Heading as={"h2"}>Staking</Heading>
    <Text>Your balance: {token.balance}</Text>
    <Box>      
      <Text>Your staking amount:</Text>
      <Flex style={{ alignItems: "center"}}>
        <Text>{stakingInfo.stakingAmount} {token.symbol}</Text>
        <Button onClick={() => withdrawStakingToken(token.address)}>Withdraw</Button>
      </Flex>
    </Box>
    <Box>
      <Text>Your earned amount:</Text>
      <Flex style={{ alignItems: "center"}}>
        <Text>{stakingInfo.earned} {token.symbol}</Text>
        <Button onClick={() => claimEarnedToken(token.address)}>Claim</Button>
      </Flex>
    </Box>
    { !stakingInfo.isStakingPaused &&
      <Box>
        <Text>Approved: {stakingInfo.allowance}</Text>
        <Field label="Stake now">
          <Flex>
            <Input
              type="number"
              onChange={(event)=>handleStakeInput(event.target.value)}
              value={stakeValue}
              placeholder={`100,000`}
            />
            <Button onClick={() => {approve(token.address)}}>Approve</Button>
            <Button onClick={() => {stakeToken(token.address)}}>Stake</Button>
          </Flex>
        </Field>
      </Box>
    }
  </div>
)

export default TokenInfo
