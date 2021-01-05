import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ExplorePageTemplate, { ExplorePageTemplateProps } from "./index";
import { tokenListState } from "../../../utils/mockData";

export default {
  title: "Templates/ExplorePageTemplate",
  component: ExplorePageTemplate,
} as Meta;

const Template: Story<ExplorePageTemplateProps> = (args) => (
  <BrowserRouter>
    <ExplorePageTemplate {...args} />
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
    type: "explore",
    color: "primary",
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
    type: "explore",
    color: "primary",
  },
};
