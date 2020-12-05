import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "rimble-ui";

export interface LinkOutlineButtonProps {
  readonly m: number;
  readonly path: string;
  readonly text: string;
  readonly mainColor: string;
}

const LinkOutlineButton = ({
  m,
  path,
  text,
  mainColor,
}: LinkOutlineButtonProps) => (
  <Link to={path} style={{ textDecoration: "none" }}>
    <Button mainColor={mainColor} mr={m}>
      {text}
    </Button>
  </Link>
);

export default LinkOutlineButton;
