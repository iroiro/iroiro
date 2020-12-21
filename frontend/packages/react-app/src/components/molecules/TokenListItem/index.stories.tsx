import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenListItem from "./index";
import { TokenListItemProps } from "./index";

export default {
  title: "Molecules/TokenListItem",
  component: TokenListItem,
} as Meta;

const Template: Story<TokenListItemProps> = (args) => (
  <BrowserRouter>
    <TokenListItem {...args} />
  </BrowserRouter>
);

export const Dashboard = Template.bind({});
Dashboard.args = {
  color: "itblue",
  name: "Sample Token",
  address: "0x",
  type: "dashboard",
};

export const Explore = Template.bind({});
Explore.args = {
  color: "itred",
  name: "Sample Token",
  address: "0x",
  type: "explore",
};
