import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DashboardPageTemplate, { DashboardPageTemplateProps } from "./index";
import { TokenListState } from "../../../reducers/tokens";

export default {
  title: "Templates/DashboardPageTemplate",
  component: DashboardPageTemplate,
} as Meta;

const Template: Story<DashboardPageTemplateProps> = (args) => (
  <BrowserRouter>
    <DashboardPageTemplate {...args} />
  </BrowserRouter>
);

const state: TokenListState = {
  tokens: [
    {
      tokenAddress: "0xabcd....1234",
      name: "Iroiro Token",
      symbol: "IRO",
      decimals: 8,
      totalSupply: 2000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Storybook Token",
      symbol: "STR",
      decimals: 18,
      totalSupply: 1000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Test Token",
      symbol: "TST",
      decimals: 4,
      totalSupply: 3000000000,
    },
  ],
  isOpen: false,
  inputTokenAddress: "",
  tokenAddress: "",
  type: "dashboard",
  color: "itblue",
};

export const Default = Template.bind({});
Default.args = {
  state,
};

export const NoTokens = Template.bind({});
NoTokens.args = {
  state: {
    tokens: [],
    isOpen: false,
    inputTokenAddress: "",
    tokenAddress: "",
    type: "dashboard",
    color: "itblue",
  },
};

export const Loading = Template.bind({});
Loading.args = {
  state: {
    tokens: [],
    isOpen: false,
    inputTokenAddress: "",
    tokenAddress: "",
    type: "dashboard",
    color: "itblue",
  },
};
