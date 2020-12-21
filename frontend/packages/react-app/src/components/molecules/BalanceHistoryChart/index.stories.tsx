import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BalanceHistoryChart, { BalanceHistoryChartProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Molecules/BalanceHistoryChart",
  component: BalanceHistoryChart,
} as Meta;

const Template: Story<BalanceHistoryChartProps> = (args) => (
  <BrowserRouter>
    <BalanceHistoryChart {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  balances: tokenInformationState.balances,
};
