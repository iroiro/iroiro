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
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Balance } from "../../../interfaces";
import { Typography, Box } from "@material-ui/core";
import { useMemo } from "react";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";

export interface BalanceHistoryChartProps {
  balances: Balance[];
}

// TODO: Fix overflow. See https://github.com/recharts/recharts/issues/1127
const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({
  balances,
}: BalanceHistoryChartProps) => {
  const chartWidth = useMemo(() => {
    const number = window.innerWidth - 200;
    if (number <= 300) {
      return 300;
    }
    return number;
  }, []);
  return (
    <Box mt={2}>
      <Box mb={1}>
        <Typography variant="h3">Balance history</Typography>
      </Box>
      <ChartWrapper>
        {balances.length === 0 ? (
          <Typography>No Data</Typography>
        ) : (
          <LineChart width={chartWidth} height={chartWidth / 2} data={balances}>
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
      </ChartWrapper>
    </Box>
  );
};

const ChartWrapper = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: center;
  /* ${theme.breakpoints.down(600)} {
    display: block;
  } */
`;

export default BalanceHistoryChart;
