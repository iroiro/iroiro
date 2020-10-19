import React from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Text,
  Form,
} from "rimble-ui";
import NumberInput from "../molecules/NumberInput";

const AudiusDistribution = ({
  libs,
  audius,
  audiusFollowers,
  isAudiusSigningIn,
  emailRef,
  passwordRef,
  audiusSignIn,
  handleSubmit,
  amountInput,
  amountValue,
  tokenInfo,
}) => (
  <div>
    {libs && !audius && !isAudiusSigningIn ? 
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
        <Text>Balance: {tokenInfo.balance}</Text>
        <Form  onSubmit={handleSubmit}>
          <Box>
            <NumberInput
              label="Token Name"
              handleInput={amountInput}
              inputValue={amountValue}
              placeholder="Fan Token"
            />
          </Box>
          <Button type="submit">Transfer tokens</Button>
        </Form>
        {audiusFollowers.map(follower => 
          <Flex
            key={follower.wallet}
          >
            <Text>{follower.handle}</Text>
            <Text>{follower.wallet}</Text>
          </Flex>
        )}
      </Box>
    }
  </div>
)

export default AudiusDistribution
