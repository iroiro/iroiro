import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenCampaigns, { TokenCampaignsProps } from "./index";
import { TokenInformationState } from "../../../interfaces";

export default {
  title: "Organisms/TokenCampaigns",
  component: TokenCampaigns,
} as Meta;

const Template: Story<TokenCampaignsProps> = (args) => (
  <BrowserRouter>
    <TokenCampaigns {...args} />
  </BrowserRouter>
);

const campaign = {
  address: "",
  name: "A campaign",
  description: "This is a campaign.",
};

const state: TokenInformationState = {
  token: {
    tokenAddress: "",
    name: "",
    symbol: "",
    decimals: 10,
    totalSupply: 10000000000,
  },
  campaigns: [],
  campaignInformationList: [campaign, campaign, campaign],
  userBalance: "",
};

export const Default = Template.bind({});
Default.args = {
  state,
};

export const NoCampaigns = Template.bind({});
NoCampaigns.args = {
  state: { ...state, campaignInformationList: [] },
};
