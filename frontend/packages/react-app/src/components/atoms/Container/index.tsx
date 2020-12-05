import * as React from "react";
import { Box } from "rimble-ui";

const Container = (props: any) => (
  <Box m={"auto"} my={5} width={[3 / 4, 1 / 2]}>
    {props.children}
  </Box>
);

export default Container;
