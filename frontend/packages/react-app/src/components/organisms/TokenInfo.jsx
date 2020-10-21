import React from "react";
import { Heading, Box, Text, Field, Button, Input, Flex, Link } from "rimble-ui";

const TokenInfo = ({ token, stakingInfo, withdrawStakingToken, claimEarnedToken, approve, stakeToken, handleStakeInput, stakeValue }) => (
  <div>
    <Heading as={"h1"}>{token.name}</Heading>
    <Box bg="white" p={4}>
      <Heading as={"h2"} mt={2}>Basic Info</Heading>
      <Box>
        <Flex style={{justifyContent: "space-between"}}>
          <Box>
            <Text>Symbol:</Text>
            <Text fontSize={5} fontWeight={"bold"}>{token.symbol}</Text>
          </Box>
          <Box>
            <Text>Decimals:</Text>
            <Text fontSize={5} fontWeight={"bold"}>{token.decimals}</Text>
          </Box>
          <Box>
            <Text>Total Supply:</Text>
            <Text fontSize={5} fontWeight={"bold"}>{token.totalSupply}</Text>
          </Box>
        </Flex>    
        <Box mt={2}>
          <Link href={`https://ropsten.etherscan.io/address/${token.address}`} target="\_blank" color="itblue">View in Etherscan ↗︎</Link>
        </Box>
      </Box>
      <Heading as={"h2"} mt={5}>Allocation</Heading>
      <Flex style={{justifyContent: "space-between"}}>
        <Box>
          <Text>Team:</Text>
          <Text fontWeight={"bold"} fontSize={5}>{token.creatorTokenRatio}%</Text>
        </Box>
        <Box>
          <Text>Community:</Text>
          <Text fontWeight={"bold"} fontSize={5}>{100 - token.creatorTokenRatio}%</Text>
        </Box>
        <Box>
          <Text>Lockup period:</Text>
          <Flex style={{alignItems: "center"}}>
            <Text fontSize={5} fontWeight={"bold"}>{token.lockupPeriod}</Text>
            <Text fontWeight={"bold"} ml={2}>year</Text>
          </Flex>
        </Box>
      </Flex>
      <Heading as={"h2"} mt={5}>Staking</Heading>
      <Box>
        <Text>Your balance:</Text>
        <Text fontSize={5} fontWeight={"bold"}>{token.balance}</Text>
      </Box>
      <Flex style={{ justifyContent: "space-between"}}>
        <Box mt={2}>
          <Text>Your staking amount:</Text>
          <Flex mt={2} style={{ alignItems: "center"}}>
            <Text fontSize={5} fontWeight={"bold"} mr={3}>{stakingInfo.stakingAmount}</Text>
            <Text fontWeight={"bold"} mr={3}>{token.symbol}</Text>
            <Button onClick={() => withdrawStakingToken(token.address)} mainColor="itblue">Withdraw</Button>
          </Flex>
        </Box>
        <Box mt={2}>
          <Text>Your earned amount:</Text>
          <Flex mt={2} style={{ alignItems: "center"}}>
            <Text fontSize={5} fontWeight={"bold"} mr={3}>{stakingInfo.earned}</Text>
            <Text fontWeight={"bold"} mr={3}>{token.symbol}</Text>
            <Button onClick={() => claimEarnedToken(token.address)} mainColor="itblue">Claim</Button>
          </Flex>
        </Box>
      </Flex>
      { !stakingInfo.isStakingPaused &&
        <Box mt={4}>
          <Text>Approved: {stakingInfo.allowance}</Text>
          <Field label="Stake now">
            <Flex>
              <Input
                type="number"
                onChange={(event)=>handleStakeInput(event.target.value)}
                value={stakeValue}
                placeholder={`100,000`}
              />
              <Button mx={2} onClick={() => {approve(token.address)}} mainColor="itgreen">Approve</Button>
              <Button onClick={() => {stakeToken(token.address)}} mainColor="itgreen">Stake</Button>
            </Flex>
          </Field>
        </Box>
      }
    </Box>
  </div>
)

export default TokenInfo
