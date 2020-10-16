import React from "react";
import {
  Heading,
  Box,
  Form,
  Button,
  Flex,
  Text,
  Modal,
  Card,
  Field,
  Input,
} from "rimble-ui";
import TextInput from "../molecules/TextInput"
import NumberInput from "../molecules/NumberInput"
import NumberInputReadOnly from "../molecules/NumberInputReadOnly"
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
  lockupInput,
  lockupValue,
  handleStakingCheckbox,
  stakingCheckboxValue,
  handleAudiusCheckbox,
  audiusCheckboxValue,
  audius,
  libs,
  isAudiusSigningIn,
  emailRef,
  passwordRef,
  audiusFollowers,
  audiusSignIn,
  audiusSignOut,
  openModal,
  closeModal,
  isOpen,
  audiusPercentageInput,
  audiusPercentageValue,
  handleAudiusDistribution,
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
          <NumberInput
            label="Team"
            handleInput={teamInput}
            inputValue={teamValue}
            max={100}
            placeholder="30%"
          />
          <Flex flexWrap={"wrap"}>
            <NumberInputReadOnly
              label="Community (general)"
              value={100 - teamValue - ((100 - teamValue) * audiusPercentageValue / 100)}
            />
            <NumberInputReadOnly
              label="Community (Audius)"
              value={((100 - teamValue) * audiusPercentageValue / 100)}
            />
          </Flex>
          <Box mb={3}>
            <Text>You can distribute tokens to your current Audius followers. (Optional)</Text>
            <Button.Outline size="small" mainColor="white" onClick={openModal}>Use Audius</Button.Outline>
            <Modal isOpen={isOpen}>
              <Card width={"420px"} p={0}>
                <Button.Text
                  icononly
                  icon={"Close"}
                  color={"moon-gray"}
                  position={"absolute"}
                  top={0}
                  right={0}
                  mt={3}
                  mr={3}
                  onClick={closeModal}
                />
                {libs && !audius && !isAudiusSigningIn && (
                  <Box m={2}>
                    <Heading as={"h2"}>Login in to Audius</Heading>
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
                  </Box>
                )}
                {audius && (
                  <Box m={2}>
                    <Box my={4}>
                      <Heading as={"h4"}>What percentage of the tokens you distribute to the community will be distributed to your Audius followers?</Heading>
                      <Text>Handle: {audius.handle}</Text>
                      <Text>Followers: {audiusFollowers.length}</Text>
                      <NumberInput
                        label="Audius followers percentage"
                        handleInput={audiusPercentageInput}
                        inputValue={audiusPercentageValue}
                        placeholder="10"
                      />
                    </Box>
                    <Flex
                      px={4}
                      py={3}
                      borderTop={1}
                      borderColor={"#E8E8E8"}
                      justifyContent={"flex-end"}
                    >
                      <Button.Outline onClick={audiusSignOut} mr={2}>Cancel</Button.Outline>
                      <Button onClick={handleAudiusDistribution}>Confirm</Button>
                    </Flex>
                  </Box>
                )}
              </Card>
            </Modal>
          </Box>
          <NumberInput
            label="Lockup period (year)"
            handleInput={lockupInput}
            inputValue={lockupValue}
            placeholder="3"
          />
        </Box>
        <Heading as={"h2"}>Earning option</Heading>
        <Box>
          <CheckBox
            handleCheckbox={handleStakingCheckbox}
            checkboxValue={stakingCheckboxValue}
            text="Can earn tokens through token staking"
          />
        </Box>
        <Button type="submit">
          Create Token
        </Button>
      </Form>
    </Box>
  </div>
)

export default CreateTokenForm