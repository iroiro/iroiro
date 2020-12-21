import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenCampaigns, { TokenCampaignsProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenCampaigns",
  component: TokenCampaigns,
} as Meta;

const Template: Story<TokenCampaignsProps> = (args) => (
  <BrowserRouter>
    <TokenCampaigns {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};

export const NoCampaigns = Template.bind({});
NoCampaigns.args = {
  state: { ...tokenInformationState, campaigns: [] },
};
