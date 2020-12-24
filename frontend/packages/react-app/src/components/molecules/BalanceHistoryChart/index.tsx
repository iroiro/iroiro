import * as React from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Balance } from "../../../interfaces";
import { Typography, Paper, Box } from "@material-ui/core";

export interface BalanceHistoryChartProps {
  balances: Balance[];
}

// TODO: Fix overflow. See https://github.com/recharts/recharts/issues/1127
const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({
  balances,
}: BalanceHistoryChartProps) => {
  return (
    <Box mt={2}>
      <Box mb={1}>
        <Typography variant="h3">Balance history</Typography>
      </Box>
      <Paper>
        <Box p={8} display="flex" justifyContent="center">
          {balances.length === 0 ? (
            <Typography>No Data</Typography>
          ) : (
            <LineChart width={600} height={300} data={balances}>
              <XAxis
                dataKey="timestamp"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(unixTime: number) =>
                  new Date(unixTime).toLocaleDateString()
                }
                type="number"
              />
              <YAxis />
              <Line type="monotone" dataKey="balance" stroke="#E25E89" />
            </LineChart>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default BalanceHistoryChart;
