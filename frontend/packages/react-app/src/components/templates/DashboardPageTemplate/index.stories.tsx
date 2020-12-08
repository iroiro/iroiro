import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DashboardPageTemplate, { DashboardPageTemplateProps } from "./index";
import { tokenListState } from "../../../utils/mockData";

export default {
  title: "Templates/DashboardPageTemplate",
  component: DashboardPageTemplate,
} as Meta;

const Template: Story<DashboardPageTemplateProps> = (args) => (
  <BrowserRouter>
    <DashboardPageTemplate {...args} />
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
    inputTokenAddress: "",
    tokenAddress: "",
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
    inputTokenAddress: "",
    tokenAddress: "",
    type: "dashboard",
    color: "itblue",
  },
};
