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
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { TokenInformationState } from "../../../interfaces";
import UserActivityCard from "../../molecules/UserActivityCard";

export interface UserActivitiesProps {
  readonly state: TokenInformationState;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  state: { activities, token },
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
          <Grid key={activity.timestamp} item xs={12}>
            <UserActivityCard activity={activity} token={token} />
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

export default UserActivities;
