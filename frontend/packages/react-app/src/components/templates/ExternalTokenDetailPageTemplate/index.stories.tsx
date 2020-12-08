import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ExternalTokenDetailPageTemplate, {
  ExternalTokenDetailPageTemplateProps,
} from "./index";
import { TokenInfo, CampaignInfo } from "../../../interfaces";
import { campaign, tokenState } from "../../../utils/mockData";

export default {
  title: "Templates/ExternalTokenDetailPageTemplate",
  component: ExternalTokenDetailPageTemplate,
} as Meta;

const Template: Story<ExternalTokenDetailPageTemplateProps> = (args) => (
  <BrowserRouter>
    <ExternalTokenDetailPageTemplate {...args} />
  </BrowserRouter>
);

const campaignsState: CampaignInfo[] = [campaign, campaign, campaign];
        
export const Default = Template.bind({});
Default.args = {
  active: true,
  tokenState,
  campaignsState,
};

export const NoCampaigns = Template.bind({});
NoCampaigns.args = {
  active: true,
  tokenState,
  campaignsState: [],
};

export const NoWallet = Template.bind({});
NoWallet.args = {
  active: false,
  tokenState,
  campaignsState,
};
