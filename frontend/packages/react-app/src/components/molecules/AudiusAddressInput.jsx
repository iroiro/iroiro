import React from "react";
import {
  Heading,
  Box,
  Form,
  Button,
  Card,
  Text
} from "rimble-ui";

import TextInput from "../molecules/TextInput"

const AudiusAddressInput = ({
  addressSubmit,
  addressInput,
  addressValue
}) => (
  <Box mt={4}>
    <Heading as={"h2"}>Add Contract</Heading>
    <Card>
      <Form onSubmit={addressSubmit}>
        <Text fontSize="3" fontWeight="bold">Step 01:</Text>
        <Text fontSize="2" fontWeight="bold">Input token's contract address to request to set your wallet address.</Text>
        <TextInput
          label=""
          handleInput={addressInput}
          inputValue={addressValue}
          placeholder="0x123...123"
        />
        <Button mb={3} mainColor="itred" type="submit">Request</Button>
      </Form>
    </Card>
  </Box>
)

export default AudiusAddressInput