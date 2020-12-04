import * as React from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Balance } from "../../../interfaces";

export interface BalanceHistoryChartProps {
  balances: Balance[];
}

const BalanceHistoryChart = ({ balances }: BalanceHistoryChartProps) => {
  return (
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
  );
};

export default BalanceHistoryChart;
