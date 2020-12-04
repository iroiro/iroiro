import * as React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Activity, TokenBasic } from "../../../interfaces";

export interface UserActivityCardProps {
  readonly activity: Activity;
  readonly token?: TokenBasic;
}

const UserActivityCard = ({ activity, token }: UserActivityCardProps) => {
  return (
    <Grid item key={activity.timestamp} xs={12}>
      <Card>
        <CardContent>
          <Typography>
            {new Date(parseInt(activity.timestamp) * 1000).toLocaleDateString()}
          </Typography>
          <Typography>
            {activity.name} {activity.amount} ${token?.symbol}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserActivityCard;
