import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ExternalTokenDetailPageTemplate, {
  ExternalTokenDetailPageTemplateProps,
} from "./index";
import { Campaigns } from "../../../interfaces";
import { campaign, tokenInfo } from "../../../utils/mockData";

export default {
  title: "Templates/ExternalTokenDetailPageTemplate",
  component: ExternalTokenDetailPageTemplate,
} as Meta;

const Template: Story<ExternalTokenDetailPageTemplateProps> = (args) => (
  <BrowserRouter>
    <ExternalTokenDetailPageTemplate {...args} />
  </BrowserRouter>
);

const campaignsState: Campaigns = {
  campaigns: [campaign, campaign, campaign],
};

export const Default = Template.bind({});
Default.args = {
  active: true,
  tokenState: tokenInfo,
  campaignsState,
};

export const NoCampaigns = Template.bind({});
NoCampaigns.args = {
  active: true,
  tokenState: tokenInfo,
  campaignsState: { campaigns: [] },
};

export const NoWallet = Template.bind({});
NoWallet.args = {
  active: false,
  tokenState: tokenInfo,
  campaignsState,
};
