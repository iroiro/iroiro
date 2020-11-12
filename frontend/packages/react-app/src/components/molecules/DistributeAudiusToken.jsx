import React from "react";
import {
  Button,
  Text,
  Flex,
  Form,
  Heading,
  Card,
  Box,
  Table,
} from "rimble-ui";
import NumberInput from "../molecules/NumberInput";

const DistributeAudiusToken = ({
  tokenInfo,
  handleSubmit,
  amountInput,
  amountValue,
  addAudiusList,
  audiusFollowers,
}) => (
  <Box>
    <Heading as={"h1"}>{tokenInfo.name}</Heading>
    <Card>
      <Heading as={"h2"}>Token info</Heading>
      <Flex style={{ justifyContent: "space-between"}}>
        <Box>
          <Text>Balance:</Text>
          <Flex style={{alignItems: "center"}}>
            <Text fontSize={2} fontWeight="bold">{tokenInfo.balance}</Text>
            <Text fontWeight="bold" ml={2}>{tokenInfo.symbol}</Text>
          </Flex>
        </Box>
        <Box>
          <Text>Contract Address:</Text>
          <Text  fontSize={2} fontWeight="bold">{tokenInfo.address}</Text>
        </Box>
      </Flex>
    </Card>
    <Card mt={2}>
      <Heading as={"h2"}>Distribution setting</Heading>
      <Box>
        <Text>Audius contract balance:</Text>
        <Flex style={{alignItems: "center"}}>
          <Text fontWeight="bold">{tokenInfo.balanceOfAudius}</Text>
          <Text ml={2} fontWeight="bold">{tokenInfo.symbol}</Text>
        </Flex>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Flex style={{ alignItems: "flex-end"}}>
          <NumberInput
            label=""
            handleInput={amountInput}
            inputValue={amountValue}
            placeholder="Fan Token"
          />
          <Button ml={2} mb={3} type="submit">Transfer tokens</Button>
        </Flex>
      </Form>
      <Heading as={"h3"} mt={4}>Add followers list to contract and start distribution</Heading>
      <Button mt={2} onClick={addAudiusList}>Start</Button>
    </Card>
    <Card mt={2}>  
      <Heading as={"h2"}>Audius followers list</Heading>
      <Table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {audiusFollowers.map(follower => 
            <tr key={follower.wallet}>
              <td>{follower.handle}</td>
              <td>{follower.wallet}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  </Box>
)

export default DistributeAudiusToken