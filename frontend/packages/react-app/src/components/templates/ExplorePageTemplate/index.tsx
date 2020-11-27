import React from "react";
import {
  Box,
  Flex,
  Modal,
  Button,
  Card,
  Heading,
  Text,
  Link,
  Form,
  Field,
  Input,
} from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import TokenList from "../../organisms/TokenList";
import { ExplorePageState } from "../../../reducers/tokens";

export interface ExportPageTemplateProps {
  readonly state: ExplorePageState;
  dispatch({}: object): void;
}

const ExplorePageTemplate = ({ state, dispatch }: ExportPageTemplateProps) => (
  <div>
    <AppHeader />
    <Box m={"auto"} my={5} width={[9 / 10, 3 / 4]}>
      <TokenList tokens={state.tokens} loading={false} />

      {/* TODO: Use Organisms and molecules */}
      <Box mt={4}>
        <Link
          my={"auto"}
          fontSize="3"
          onClick={() => dispatch({ type: "modal:open" })}
        >
          + Add new token
        </Link>

        {/* Tentative implementation */}
        <Modal isOpen={state.isOpen}>
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
              onClick={() => dispatch({ type: "modal:close" })}
            />

            <Box p={4} mb={3}>
              <Heading.h3>Set your token address</Heading.h3>
              <Form>
                <Box width={[1]} px={2}>
                  <Field label="Contract Address" width={1}>
                    <Input
                      type="text"
                      required // set required attribute to use brower's HTML5 input validation
                      onChange={(event: any) =>
                        dispatch({
                          type: "tokenAddress:input",
                          payload: { tokenAddress: event.target.value },
                        })
                      }
                      value={state.inputTokenAddress}
                      width={1}
                    />
                  </Field>
                </Box>
              </Form>
            </Box>

            <Flex
              px={4}
              py={3}
              borderTop={1}
              borderColor={"#E8E8E8"}
              justifyContent={"flex-end"}
            >
              <Button.Outline onClick={() => dispatch({ type: "modal:close" })}>
                Cancel
              </Button.Outline>
              <Button
                ml={3}
                onClick={() => dispatch({ type: "tokenAddress:add" })}
              >
                Add
              </Button>
            </Flex>
          </Card>
        </Modal>
      </Box>
    </Box>
  </div>
);

export default ExplorePageTemplate;
