import * as React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Activity, TokenBasic } from "../../../interfaces";

export interface UserActivityCardProps {
  readonly activity: Activity;
  readonly token: TokenBasic;
}

const UserActivityCard = ({ activity, token }: UserActivityCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          {new Date(parseInt(activity.timestamp) * 1000).toLocaleDateString()}
        </Typography>
        <Typography>
          {activity.name} ${token.symbol}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserActivityCard;
