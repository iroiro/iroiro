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
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import { Activity, TokenBasic } from "../../../interfaces";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

export interface UserActivityCardProps {
  readonly activity: Activity;
  readonly token?: TokenBasic;
}

const UserActivityCard: React.FC<UserActivityCardProps> = ({
  activity,
  token,
}) => {
  const amount = token
    ? getBalanceDevidedByDecimals(activity.amount, token.decimals)
    : activity.amount;

  return (
    <Card>
      <CardContent>
        <Typography variant="caption">
          {new Date(activity.timestamp).toLocaleDateString()}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography>{activity.name}</Typography>
          <Typography variant="h4">
            {amount} ${token?.symbol}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserActivityCard;
