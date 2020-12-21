import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import { Grid } from "@material-ui/core";
import UserActivities from "../UserActivities";
import BalanceHistoryChart from "../../molecules/BalanceHistoryChart";

export interface UserHistoryProps {
  readonly state: TokenInformationState;
}

const UserHistory: React.FC<UserHistoryProps> = ({ state }) => {
  return (
    <Grid container spacing={4} direction="column">
      <Grid item xs={12}>
        <UserActivities state={state} />
      </Grid>
      <Grid item xs={12}>
        <BalanceHistoryChart balances={state.balances} />
      </Grid>
    </Grid>
  );
};

export default UserHistory;
