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
