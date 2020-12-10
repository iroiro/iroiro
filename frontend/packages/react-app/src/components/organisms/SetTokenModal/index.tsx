import * as React from "react";
import { Heading, Modal, Card, Button, Box, Flex } from "rimble-ui";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import AddressFormInput from "../../molecules/AddressFormInput";

const SetTokenModal: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
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
        <AddressFormInput state={state} dispatch={dispatch} />
      </Box>

      <Flex
        px={4}
        py={3}
        borderTop={1}
        borderColor={"#E8E8E8"}
        justifyContent={"flex-end"}
      >
        <Button.Outline
          mainColor={state.color}
          onClick={() => dispatch({ type: "modal:close" })}
        >
          Cancel
        </Button.Outline>
        <Button
          mainColor={state.color}
          ml={3}
          onClick={() => dispatch({ type: "tokenAddress:add" })}
        >
          Add
        </Button>
      </Flex>
    </Card>
  </Modal>
);

export default SetTokenModal;
