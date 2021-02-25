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
import { Typography, Box } from "@material-ui/core";

export interface ItemProps {
  readonly title: string;
  readonly text: string;
}

const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <Box mr={4}>
      <Typography variant="subtitle2" style={{ fontWeight: "normal" }}>
        {title}
      </Typography>
      <Typography variant="h4">{text}</Typography>
    </Box>
  );
};

export default Item;
