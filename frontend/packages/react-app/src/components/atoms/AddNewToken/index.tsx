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
