import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";
import UserActivityCard from "../../molecules/UserActivityCard";

export interface UserActivitiesProps {
  readonly state: TokenInformationState;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  state: { activities, token },
}) => (
  <div>
    <Typography variant="h5" component="h3">
      Activities
    </Typography>
    {activities.length === 0 ? (
      <Typography>No activities for this Token yet.</Typography>
    ) : (
      <Grid container spacing={4} direction="column">
        {activities.map((activity) => (
          <Grid key={activity.timestamp} item xs={12}>
            <UserActivityCard activity={activity} token={token} />
          </Grid>
        ))}
      </Grid>
    )}
  </div>
);

export default UserActivities;
