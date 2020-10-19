import React from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Text,
  Form,
  Heading,
} from "rimble-ui";
import NumberInput from "../molecules/NumberInput";
import Container from "../atoms/Container"

const AudiusDistribution = ({
  libs,
  audius,
  audiusFollowers,
  isAudiusSigningIn,
  emailRef,
  passwordRef,
  audiusSignIn,
  audiusSignOut,
  handleSubmit,
  amountInput,
  amountValue,
  tokenInfo,
  addAudiusList,
}) => (
  <div>
    <Container>
      {libs && !audius && !isAudiusSigningIn
      ? 
        <Box> 
          <Field label="Email" mr="2">
            <input ref={emailRef} required/>
            </Field>
          <Field label="Password">
            <input ref={passwordRef} type="password" required/>
          </Field>
          <Box>
            <Button onClick={audiusSignIn}>Sign In</Button>
          </Box>
        </Box>
      :
        <Box>
          <Text>Name: {tokenInfo.name}</Text>
          <Text>Balance: {tokenInfo.balance}</Text>
          <Form  onSubmit={handleSubmit}>
            <Flex style={{ alignItems: "flex-end"}}>
              <NumberInput
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
          <Box mt={4}>
            <Button size="small" variant="danger" onClick={audiusSignOut}>Signout from Audius</Button>
          </Box>
        </Box>
      }
    </Container>
  </div>
)

export default AudiusDistribution
