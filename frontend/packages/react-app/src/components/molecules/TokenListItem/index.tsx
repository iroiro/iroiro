/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

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
