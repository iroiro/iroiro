import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import CreateCampaignPageTemaplate, { CampaignInfo } from "./index";
import { distributionTargets, tokenInfo } from "../../../utils/mockData";

export default {
  title: "Templates/CreateCampaignPageTemaplate",
  component: CreateCampaignPageTemaplate,
} as Meta;

const Template: Story<CampaignInfo> = (args) => (
  <BrowserRouter>
    <CreateCampaignPageTemaplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  tokenInfo: tokenInfo,
  targets: distributionTargets,
  targetNumber: 1234567890123450,
};
