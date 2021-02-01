import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenRequestCard, { TokenRequestCardProps } from "./index";
import { campaign } from "../../../utils/mockData";

export default {
  title: "Molecules/TokenRequestCard",
  component: TokenRequestCard,
} as Meta;

const Template: Story<TokenRequestCardProps> = (args) => (
  <BrowserRouter>
    <TokenRequestCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: {
    isTokenCheckFinished: false,
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(),
    distributorType: "",
    isTokenRequested: false,
    isTokenApproved: true,
  },
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    isTokenCheckFinished: false,
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(),
    distributorType: "",
    isTokenRequested: true,
    isTokenApproved: true,
  },
};
