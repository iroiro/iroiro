import React from "react";
import { Box, Link, Button } from "@material-ui/core";
import { ACTIONS } from "../../../reducers/tokens";

export interface AddNewTokenProps {
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  dispatch: React.Dispatch<ACTIONS>;
}

const AddNewToken: React.FC<AddNewTokenProps> = ({ color, dispatch }) => (
  <Box color={color} mt={4} style={{ textAlign: "center" }}>
    <Link onClick={() => dispatch({ type: "modal:open" })}>
      <Button color={color}>+ Add new token</Button>
    </Link>
  </Box>
);

export default AddNewToken;
