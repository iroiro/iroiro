import React from "react";
import { Box, Link } from "rimble-ui";

export interface AddNewTokenProps {
  color: string;
  dispatch({}: object): void;
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
