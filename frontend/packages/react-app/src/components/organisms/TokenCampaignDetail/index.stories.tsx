import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import BasicTokenInformation, { TokenCampaignDetailProps } from "./index";
import TokenCampaignDetail from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenCampaignDetail",
  component: TokenCampaignDetail,
} as Meta;

const Template: Story<TokenCampaignDetailProps> = (args) => (
  <BrowserRouter>
    <BasicTokenInformation {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
  campaignAddress: "0xcampaign...1234",
};

export const NotFound = Template.bind({});
NotFound.args = {
  state: tokenInformationState,
};
