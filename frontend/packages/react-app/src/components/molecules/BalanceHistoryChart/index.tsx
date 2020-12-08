import * as React from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Balance } from "../../../interfaces";
import { Typography } from "@material-ui/core";

export interface BalanceHistoryChartProps {
  balances: Balance[];
}

const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({
  balances,
}: BalanceHistoryChartProps) => {
  return (
    <div>
      <Typography variant="h5" component="h3">
        Activities
      </Typography>
      <LineChart width={500} height={300} data={balances}>
        <XAxis
          dataKey="timestamp"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(unixTime: number) =>
            new Date(unixTime).toLocaleDateString()
          }
          type="number"
        />
        <YAxis />
        <Line type="monotone" dataKey="balance" />
      </LineChart>
    </div>
  );
};

export default BalanceHistoryChart;
