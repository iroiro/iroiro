import * as React from "react";
import { Grid } from "@material-ui/core";
import UserActivities from "../UserActivities";
import BalanceHistoryChart from "../../molecules/BalanceHistoryChart";
import { TokenHistoryState } from "../../../reducers/tokenHistory";

export interface UserHistoryProps {
  readonly state: TokenHistoryState;
}

const UserHistory: React.FC<UserHistoryProps> = ({ state }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <UserActivities state={state} />
        </Grid>
        <Grid item xs={12}>
          <BalanceHistoryChart balances={state.balances} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserHistory;
