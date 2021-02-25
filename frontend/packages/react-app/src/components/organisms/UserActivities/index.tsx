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
import { Grid, Typography, Box } from "@material-ui/core";
import UserActivityCard from "../../molecules/UserActivityCard";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import { useTokenContext } from "../../../context/token";
import styled from "styled-components";

export interface UserActivitiesProps {
  readonly state: TokenHistoryState;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  state: { activities },
}) => {
  const { state: tokenState } = useTokenContext();
  return (
    <div>
      <Box mb={1}>
        <Typography variant="h3">Activities</Typography>
      </Box>
      <div
        style={{
          borderBottom: "1px solid #C4C4C4",
          marginBottom: 32,
          paddingBottom: 12,
        }}
      >
        <div style={{ borderBottom: "1px solid #C4C4C4", marginBottom: 12 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ padding: "4px 12px" }}
          >
            <Typography variant="caption" style={{ flex: "0 3 52px" }}>
              Date
            </Typography>
            <Typography
              variant="caption"
              style={{ flex: "1 0 100px", paddingLeft: 8 }}
            >
              Activity
            </Typography>
            <Typography
              variant="caption"
              style={{ flex: "2 0 auto", textAlign: "right" }}
            >
              Amount
            </Typography>
          </Box>
        </div>
        {activities.length === 0 ? (
          <Box py={8} textAlign="center">
            <Typography>No activities for this Token yet.</Typography>
          </Box>
        ) : (
          <StyledGrid container spacing={1} direction="column">
            {activities.map((activity) => (
              <Grid
                key={activity.timestamp + activity.amount}
                item
                style={{ padding: "4px 12px" }}
              >
                <UserActivityCard
                  activity={activity}
                  token={tokenState.token}
                />
              </Grid>
            ))}
          </StyledGrid>
        )}
      </div>
    </div>
  );
};

const StyledGrid = styled(Grid)`
  & > div:nth-child(even) {
    background-color: #fafafa;
  }
`;

export default UserActivities;
