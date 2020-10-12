import React from "react";
import {
  Heading,
  Box,
  Form,
  Button,
  Flex
} from "rimble-ui";
import TextInput from "../molecules/TextInput"
import NumberInput from "../molecules/NumberInput"
import CheckBox from "../molecules/CheckBox"

const CreateTokenForm = ({
  handleSubmit,
  nameInput,
  nameValue,
  symbolInput,
  symbolValue,
  numberInput,
  numberValue,
  decimalsInput,
  decimalsValue,
  handleLimitCheckbox,
  limitCheckboxValue,
  teamInput,
  teamValue,
  communityInput,
  communityValue,
  lockupInput,
  lockupValue,
  handleStakingCheckbox,
  stakingCheckboxValue
}) => (
  <div>
    <Box>
      <Form onSubmit={handleSubmit}>
        <Heading as={"h2"}>Basic Settings</Heading>
        <Box>
          <TextInput
            label="Token Name"
            handleInput={nameInput}
            inputValue={nameValue}
            placeholder="Fan Token"
          />
        </Box>
        <Box>
          <TextInput
            label="Symbol"
            handleInput={symbolInput}
            inputValue={symbolValue}
            placeholder="ETH, BTC, UNI"
          />
        </Box>
        <Box>
          <NumberInput
            label="TotalSupply"
            handleInput={numberInput}
            inputValue={numberValue}
            placeholder="1,000,000,000,000"
          />
        </Box>
        <Box>
          <NumberInput
            label="Dicimals"
            handleInput={decimalsInput}
            inputValue={decimalsValue}
            placeholder="18"
          />
        </Box>
        <Box>
          <CheckBox
            handleCheckbox={handleLimitCheckbox}
            checkboxValue={limitCheckboxValue}
            text="Can be additionally mint by staking"
          />
        </Box>
        <Heading as={"h2"}>Allocation</Heading>
        <Box>
          <Flex flexWrap={"wrap"}>
            <NumberInput
              label="Team"
              handleInput={teamInput}
              inputValue={teamValue}
              placeholder="30%"
            />
            <NumberInput
              label="Community"
              handleInput={communityInput}
              inputValue={communityValue}
              placeholder="70%"
            />
          </Flex>
          <NumberInput
            label="Lockup period (year)"
            handleInput={lockupInput}
            inputValue={lockupValue}
            placeholder="3"
          />
          <Heading as={"h2"}>Earning option</Heading>
          <Box>
            <CheckBox
              handleCheckbox={handleStakingCheckbox}
              checkboxValue={stakingCheckboxValue}
              text="Can earn tokens through token staking"
            />
          </Box>
        </Box>
        <Button type="submit">
          Create Token
        </Button>
      </Form>
    </Box>
  </div>
)

export default CreateTokenForm