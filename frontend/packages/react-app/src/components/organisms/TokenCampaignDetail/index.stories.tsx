import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenCampaignDetail, { TokenCampaignDetailProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenCampaignDetail",
  component: TokenCampaignDetail,
} as Meta;

const Template: Story<TokenCampaignDetailProps> = (args) => (
  <BrowserRouter>
    <TokenCampaignDetail {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  campaign: tokenInformationState.campaigns[0],
};
