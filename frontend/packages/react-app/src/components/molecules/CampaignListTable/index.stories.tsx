import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignListTable from "./index";
import {
  CampaignInfo,
  TokenAndCampaignProps,
  TokenInfo,
} from "../../../interfaces";

import { campaign } from "../../../utils/mockData";

export default {
  title: "Molecules/CampaignListTable",
  component: CampaignListTable,
} as Meta;

const Template: Story<TokenAndCampaignProps> = (args) => (
  <BrowserRouter>
    <CampaignListTable {...args} />
  </BrowserRouter>
);

const tokenState: TokenInfo = {
  token: {
    name: "TestUsdtToken",
    tokenAddress: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
  },
};

const campaignsState: CampaignInfo[] = [campaign, campaign, campaign];

export const Default = Template.bind({});
Default.args = {
  tokenState,
  campaignsState,
};

export const NoCampaign = Template.bind({});
NoCampaign.args = {
  tokenState,
  campaignsState: [],
};
