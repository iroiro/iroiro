import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CampaignStatusChip, { CampaignStatusChipProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/CampaignStatusChip",
  component: CampaignStatusChip,
} as Meta;

const Template: Story<CampaignStatusChipProps> = (args) => (
  <BrowserRouter>
    <CampaignStatusChip {...args} />
  </BrowserRouter>
);

export const Active = Template.bind({});
Active.args = {
  status: 0,
};

export const Cancelled = Template.bind({});
Cancelled.args = {
  status: 1,
};

export const Ended = Template.bind({});
Ended.args = {
  status: 2,
};
