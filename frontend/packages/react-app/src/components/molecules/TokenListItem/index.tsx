import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

export interface TokenListItemProps {
  readonly name: string;
  readonly address: string;
  readonly color?: string | undefined;
  readonly type: string;
}

const TokenListItem: React.FC<TokenListItemProps> = ({
  name,
  address,
  type,
  color,
}) => (
  <Box
    display="flex"
    m={2}
    style={{ justifyContent: "space-between", alignItems: "center" }}
  >
    {type === "dashboard" && (
      <Link
        color={color}
        to={`/dashboard/${address}`}
        style={{ textDecoration: "none" }}
      >
        <Typography>{name}</Typography>
      </Link>
    )}
    {type === "explore" && (
      <Link
        color={color}
        to={`/explore/${address}`}
        style={{ textDecoration: "none" }}
      >
        <Typography>{name}</Typography>
      </Link>
    )}
  </Box>
);

export default TokenListItem;
