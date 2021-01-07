import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@material-ui/core";

export interface LinkOutlineButtonProps {
  readonly m: number;
  readonly path: string;
  readonly text: string;
  readonly color?: "inherit" | "primary" | "secondary" | "default" | undefined;
}

const LinkOutlineButton: React.FC<LinkOutlineButtonProps> = ({
  m,
  path,
  text,
  color,
}) => (
  <Box mr={m}>
    <Button
      component={Link}
      to={path}
      style={{ textDecoration: "none" }}
      color={color}
    >
      {text}
    </Button>
  </Box>
);

export default LinkOutlineButton;
