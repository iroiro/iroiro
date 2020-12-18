import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenRequestCard, { TokenRequestCardProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

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
  state: {
    ...tokenInformationState,
    isTokenApproved: false,
    isTokenRequested: false,
  },
};

export const Approved = Template.bind({});
Approved.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenRequested: false,
  },
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenRequested: true,
  },
};
