import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenRequestCard, { TokenRequestCardProps } from "./index";

export default {
  title: "Molecules/TokenRequestCard",
  component: TokenRequestCard,
} as Meta;

const Template: Story<TokenRequestCardProps> = (args) => (
  <BrowserRouter>
    <TokenRequestCard {...args} />
  </BrowserRouter>
);

export const NoApprove = Template.bind({});
NoApprove.args = {
  tokenApproved: false,
  requested: false,
};

export const Approved = Template.bind({});
Approved.args = {
  tokenApproved: true,
  requested: false,
};

export const Requested = Template.bind({});
Requested.args = {
  tokenApproved: true,
  requested: true,
};
