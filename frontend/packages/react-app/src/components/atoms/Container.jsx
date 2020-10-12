import React from "react";
import { Box } from "rimble-ui";

const Container = ({contents}) => (
  <Box m="auto" mb="5" width={[ 1, 1/2, 1/4]}>
    {contents}
  </Box>
)

export default Container

