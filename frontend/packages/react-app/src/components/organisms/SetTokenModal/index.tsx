import * as React from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ExplorePageTemplateProps } from "../../templates/ExplorePageTemplate";
import AddressFormInput from "../../molecules/AddressFormInput";

const SetTokenModal: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
  <Modal
    open={state.isOpen}
    onClose={() => dispatch({ type: "modal:close" })}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Card>
      <IconButton
        aria-label="close"
        color={"default"}
        onClick={() => dispatch({ type: "modal:close" })}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          marginTop: 20,
          marginRight: 20,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box p={4} mb={3}>
        <Typography variant={"h4"}>Set your token address</Typography>
        <Box mt={2}>
          <AddressFormInput state={state} dispatch={dispatch} />
        </Box>
      </Box>

      <Box
        display="flex"
        px={4}
        py={3}
        borderTop={1}
        borderColor={"#E8E8E8"}
        justifyContent={"flex-end"}
      >
        <Box>
          <Button
            variant="outlined"
            onClick={() => dispatch({ type: "modal:close" })}
          >
            Cancel
          </Button>
        </Box>
        <Box ml={3}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "tokenAddress:add" })}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Card>
  </Modal>
);

export default SetTokenModal;
