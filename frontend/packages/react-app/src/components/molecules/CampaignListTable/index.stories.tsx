import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignListTable from "./index";
import {
  CampaignInfo,
  TokenAndCampaignProps,
  Campaigns,
} from "../../../interfaces";

import { campaign, tokenInfo } from "../../../utils/mockData";

export default {
  title: "Molecules/CampaignListTable",
  component: CampaignListTable,
} as Meta;

const Template: Story<TokenAndCampaignProps> = (args) => (
  <BrowserRouter>
    <CampaignListTable {...args} />
  </BrowserRouter>
);

const campaignsState: Campaigns = {
  campaigns: [campaign, campaign, campaign],
};

export const Default = Template.bind({});
Default.args = {
  tokenState: tokenInfo,
  campaignsState,
};

export const NoCampaign = Template.bind({});
NoCampaign.args = {
  tokenState: tokenInfo,
  campaignsState: { campaigns: [] },
};
