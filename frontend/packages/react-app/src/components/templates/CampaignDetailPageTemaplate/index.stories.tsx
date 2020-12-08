import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignDetailPageTemaplate, { CampaignInfoProps } from "./index";
import {
  distributionTargets,
  campaign,
  tokenInfo,
} from "../../../utils/mockData";

export default {
  title: "Templates/CampaignDetailPageTemaplate",
  component: CampaignDetailPageTemaplate,
} as Meta;

const Template: Story<CampaignInfoProps> = (args) => (
  <BrowserRouter>
    <CampaignDetailPageTemaplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  tokenInfo: tokenInfo,
  targets: distributionTargets,
  targetNumber: 1234567890123450,
  campaignInfo: campaign,
};
