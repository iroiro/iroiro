import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ExplorePageTemplate, { ExportPageTemplateProps } from "./index";
import { UserToken } from "../../../interfaces";
import { ExplorePageState } from "../../pages/ExplorePage";

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
      address: "0xabcd....1234",
      name: "Iroiro Token",
      symbol: "IRO",
      balance: "2000000000",
    },
    {
      address: "0xabcd....1234",
      name: "Storybook Token",
      symbol: "STR",
      balance: "1000000000",
    },
    {
      address: "0xabcd....1234",
      name: "Test Token",
      symbol: "TST",
      balance: "3000000000",
    },
  ],
  isOpen: false,
};

export const Default = Template.bind({});
Default.args = {
  loadWeb3Modal: () => {},
  state,
  loading: false,
};

export const NoTokens = Template.bind({});
NoTokens.args = {
  loadWeb3Modal: () => {},
  state: {
    tokens: [],
    isOpen: false,
  },
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loadWeb3Modal: () => {},
  state: {
    tokens: [],
    isOpen: false,
  },
  loading: true,
};
