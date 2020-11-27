import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ExplorePageTemplate, { ExportPageTemplateProps } from "./index";
import { UserToken } from "../../../interfaces";
import { ExplorePageState } from "../../../reducers/tokens";

export default {
  title: "Templates/ExplorePageTemplate",
  component: ExplorePageTemplate,
} as Meta;

const Template: Story<ExportPageTemplateProps> = (args) => (
  <BrowserRouter>
    <ExplorePageTemplate {...args} />
  </BrowserRouter>
);

const state: ExplorePageState = {
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
  },
};

export const Loading = Template.bind({});
Loading.args = {
  state: {
    tokens: [],
    isOpen: false,
    inputTokenAddress: "",
    tokenAddress: "",
  },
};
