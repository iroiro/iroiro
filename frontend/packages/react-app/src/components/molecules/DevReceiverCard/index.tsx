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

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core";

export interface DevReceiverCardProps {
  readonly symbolPair: string;
  readonly description: string;
  readonly onClickActionArea?: () => void;
}

const DevReceiverCard: React.FC<DevReceiverCardProps> = ({
  symbolPair,
  description,
  onClickActionArea,
}) => {
  return (
    <Card>
      <CardActionArea onClick={onClickActionArea}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {symbolPair}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DevReceiverCard;
