import * as React from "react";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";
import UserActivityCard from "../../molecules/UserActivityCard";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { useTokenContext } from "../../../context/token";

export interface UserActivitiesProps {
  readonly state: TokenHistoryState;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  state: { activities },
}) => {
  const { state: tokenState } = useTokenContext();
  return (
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
              <UserActivityCard activity={activity} token={tokenState.token} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default UserActivities;
