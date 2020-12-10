import * as React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Activity, TokenBasic } from "../../../interfaces";

export interface UserActivityCardProps {
  readonly activity: Activity;
  readonly token?: TokenBasic;
}

const UserActivityCard = ({ activity, token }: UserActivityCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          {new Date(activity.timestamp).toLocaleDateString()}
        </Typography>
        <Typography>
          {activity.name} {activity.amount} ${token?.symbol}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserActivityCard;
