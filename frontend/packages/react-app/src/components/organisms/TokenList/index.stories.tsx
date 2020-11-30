import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenList, { TokenListProps } from "./index";
import { TokenListState } from "../../../reducers/tokens";

export default {
  title: "Organisms/TokenList",
  component: TokenList,
} as Meta;

const Template: Story<TokenListProps> = (args) => (
  <BrowserRouter>
    <TokenList {...args} />
  </BrowserRouter>
);

const state: TokenListState = {
  tokens: [
    {
      tokenAddress: "0xabcd....1234",
      name: "Iroiro Token",
      symbol: "IRO",
      decimals: 18,
      totalSupply: 2000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Storybook Token",
      symbol: "STR",
      decimals: 4,
      totalSupply: 1000000000,
    },
    {
      tokenAddress: "0xabcd....1234",
      name: "Test Token",
      symbol: "TST",
      decimals: 8,
      totalSupply: 3000000000,
    },
  ],
  isOpen: false,
  tokenAddress: "0x",
  inputTokenAddress: "0x",
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
    tokenAddress: "0x",
    inputTokenAddress: "0x",
    type: "dashboard",
    color: "itblue",
  },
};

export const Loading = Template.bind({});
Loading.args = {
  state: {
    tokens: [],
    isOpen: false,
    tokenAddress: "0x",
    inputTokenAddress: "0x",
    type: "dashboard",
    color: "itblue",
  },
};
