import React from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Form,
  Heading,
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
    <Text>Name: {tokenInfo.name}</Text>
    <Text>Balance: {tokenInfo.balance}</Text>
    <Form  onSubmit={handleSubmit}>
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
    <Button mt={4} onClick={addAudiusList}>Add followers and start distribution</Button>
    <Heading as={"h2"} mt={4}>Audius followers list</Heading>
    {audiusFollowers.map(follower => 
      <Flex
        key={follower.wallet}
        mb={2}
      >
        <Text mr={2}>{follower.handle}</Text>
        <Text>{follower.wallet}</Text>
      </Flex>
    )}
  </Box>
)

export default DistributeAudiusToken