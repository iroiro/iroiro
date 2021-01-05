import React from "react";
import { Box, Link } from "@material-ui/core";
import { ACTIONS } from "../../../reducers/tokens";

export interface AddNewTokenProps {
  color?: string | undefined;
  dispatch: React.Dispatch<ACTIONS>;
}

const AddNewToken: React.FC<AddNewTokenProps> = ({ color, dispatch }) => (
  <Box color={color} mt={4} style={{ textAlign: "center" }}>
    <Link onClick={() => dispatch({ type: "modal:open" })}>
      + Add new token
    </Link>
  </Box>
);

export default AddNewToken;
