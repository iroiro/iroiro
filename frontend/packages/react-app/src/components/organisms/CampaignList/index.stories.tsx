import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignList from "./index";
import { TokenAndCampaignProps } from "../../../interfaces";
import { campaign, tokenInfo } from "../../../utils/mockData";

export default {
  title: "Organisms/CampaignList",
  component: CampaignList,
} as Meta;

const Template: Story<TokenAndCampaignProps> = (args) => (
  <BrowserRouter>
    <CampaignList {...args} />
  </BrowserRouter>
);

const campaignsState = [campaign, campaign, campaign];

export const Default = Template.bind({});
Default.args = {
  tokenState: tokenInfo,
  campaignsState,
};

export const NoCampaign = Template.bind({});
NoCampaign.args = { tokenState: tokenInfo, campaignsState: [] };
