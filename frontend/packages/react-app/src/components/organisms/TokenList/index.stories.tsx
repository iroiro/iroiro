import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenList, { TokenListProps } from "./index";
import { tokenListState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenList",
  component: TokenList,
} as Meta;

const Template: Story<TokenListProps> = (args) => (
  <BrowserRouter>
    <TokenList {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenListState,
};

export const NoTokens = Template.bind({});
NoTokens.args = {
  state: {
    ...tokenListState,
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
    ...tokenListState,
    tokens: [],
    isOpen: false,
    tokenAddress: "0x",
    inputTokenAddress: "0x",
    type: "dashboard",
    color: "itblue",
  },
};
