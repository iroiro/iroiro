import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";
import UserActivityCard from "../../molecules/UserActivityCard";

export interface UserActivitiesProps {
  readonly state: TokenInformationState;
}

const UserActivities = ({
  state: { activities, token },
}: UserActivitiesProps) => (
  <>
    <Typography variant="h5" component="h3">
      Activities
    </Typography>
    {activities.length === 0 ? (
      <Typography>No activities for this Token yet.</Typography>
    ) : (
      <>
        {activities.map((activity) => (
          <UserActivityCard activity={activity} token={token} />
        ))}
      </>
    )}
  </>
);

export default UserActivities;
