import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CampaignDetail, { CampaignDetailProps } from "./index";
import { campaign } from "../../../utils/mockData";

export default {
  title: "Organisms/CampaignDetail",
  component: CampaignDetail,
} as Meta;

const Template: Story<CampaignDetailProps> = (args) => (
  <BrowserRouter>
    <CampaignDetail {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  campaignInfo: campaign,
};
