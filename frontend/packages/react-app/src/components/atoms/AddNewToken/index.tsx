import React from "react";
import { Box, Link } from "rimble-ui";
import { ACTIONS } from "../../../reducers/tokens";

export interface AddNewTokenProps {
  color: string;
  dispatch: React.Dispatch<ACTIONS>;
}

const AddNewToken = ({ color, dispatch }: AddNewTokenProps) => (
  <Box mt={4} style={{ textAlign: "center" }}>
    <Link
      my={"auto"}
      fontSize="3"
      color={color}
      onClick={() => dispatch({ type: "modal:open" })}
    >
      + Add new token
    </Link>
  </Box>
);

export default AddNewToken;
