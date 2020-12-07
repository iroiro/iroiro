import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenDetailCampaignPanel, {
  TokenDetailCampaignPanelProps,
} from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenDetailCampaignPanel",
  component: TokenDetailCampaignPanel,
} as Meta;

const Template: Story<TokenDetailCampaignPanelProps> = (args) => (
  <BrowserRouter>
    <TokenDetailCampaignPanel {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
  campaignAddress: "0xcampaign...1234",
};

export const NotFound = Template.bind({});
NotFound.args = {
  state: {
    ...tokenInformationState,
    token: undefined,
    campaigns: [],
    userBalance: "",
  },
};
