import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BasicTokenInformation, { BasicTokenInformationProps } from "./index";
import { TokenInformationState } from "../../../interfaces";

export default {
  title: "Organisms/BasicTokenInformation",
  component: BasicTokenInformation,
} as Meta;

const Template: Story<BasicTokenInformationProps> = (args) => (
  <BrowserRouter>
    <BasicTokenInformation {...args} />
  </BrowserRouter>
);

const state: TokenInformationState = {
  token: {
    tokenAddress: "0xabcd....1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 18,
    totalSupply: 2000000000,
  },
  campaigns: [],
  campaignInformationList: [],
};

export const Default = Template.bind({});
Default.args = {
  state,
};

export const Loading = Template.bind({});
Loading.args = {
  state: {
    token: undefined,
    campaigns: [],
    campaignInformationList: [],
  },
};
