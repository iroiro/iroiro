import * as React from "react";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { Activity, TokenBasic } from "../../../interfaces";
import UserActivityCard from "../../molecules/UserActivityCard";

export interface UserActivitiesProps {
  readonly activities: Activity[];
  readonly token?: TokenBasic;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  activities,
  token,
}) => (
  <>
    <Box mb={1}>
      <Typography variant="h3">Activities</Typography>
    </Box>
    {activities.length === 0 ? (
      <Paper>
        <Box py={8} textAlign="center">
          <Typography>No activities for this Token yet.</Typography>
        </Box>
      </Paper>
    ) : (
      <Grid container spacing={1} direction="column">
        {activities.map((activity) => (
          <Grid key={activity.timestamp + activity.amount} item xs={12}>
            <UserActivityCard activity={activity} token={token} />
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

export default UserActivities;
