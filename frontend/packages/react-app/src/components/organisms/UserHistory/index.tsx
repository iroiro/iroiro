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
import { Grid } from "@material-ui/core";
import UserActivities from "../UserActivities";
import { TokenHistoryState } from "../../../reducers/tokenHistory";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface UserHistoryProps {
  readonly state: TokenHistoryState;
}

const UserHistory: React.FC<UserHistoryProps> = ({ state }) => {
  return (
    <Wrapepr>
      <Grid container direction="column">
        <Grid item xs={12}>
          <UserActivities state={state} />
        </Grid>
      </Grid>
    </Wrapepr>
  );
};

const Wrapepr = styled.div`
  padding: 32px;
  background-color: #fff;
  ${theme.breakpoints.down(760)} {
    padding: 16px;
    margin: 0 -28px;
  }
`;

export default UserHistory;
