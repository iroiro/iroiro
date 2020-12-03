import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { TokenInformationState } from "../../../interfaces";
import TokenInformationBar, { TokenInformationBarProps } from "./index";

export default {
  title: "Organisms/TokenInformationBar",
  component: TokenInformationBar,
} as Meta;

const Template: Story<TokenInformationBarProps> = (args) => (
  <BrowserRouter>
    <TokenInformationBar {...args} />
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
  userBalance: "1234500000",
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
