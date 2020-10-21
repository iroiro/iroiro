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
        <Text fontSize="3" fontWeight="bold">Input Token's Contract</Text>
        <TextInput
          label=""
          handleInput={addressInput}
          inputValue={addressValue}
          placeholder="0x123...123"
        />
        <Button mb={3} mainColor="itred" type="submit">Check tokens amount</Button>
      </Form>
    </Card>
  </Box>
)

export default AudiusAddressInput