import React from "react";
import {
  Heading,
  Box,
  Form,
  Button,
} from "rimble-ui";

import TextInput from "../molecules/TextInput"

const AudiusAddressInput = ({
  addressSubmit,
  addressInput,
  addressValue
}) => (
  <Box mt={4}>
    <Heading as={"h2"}>Add Contract</Heading>
    <Form onSubmit={addressSubmit}>
      <TextInput
        label="Input Token's Contract"
        handleInput={addressInput}
        inputValue={addressValue}
        placeholder="0x123...123"
      />
      <Button mb={3} type="submit">Check tokens amount</Button>
    </Form>
  </Box>
)

export default AudiusAddressInput