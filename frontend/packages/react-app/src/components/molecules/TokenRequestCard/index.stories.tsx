import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenRequestCard, { TokenRequestCardProps } from "./index";
import { campaignDetailState } from "../../../utils/mockData";

export default {
  title: "Molecules/TokenRequestCard",
  component: TokenRequestCard,
} as Meta;

const Template: Story<TokenRequestCardProps> = (args) => (
  <BrowserRouter>
    <TokenRequestCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: {
    ...campaignDetailState,
    isTokenRequested: false,
  },
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    ...campaignDetailState,
    isTokenRequested: true,
  },
};
