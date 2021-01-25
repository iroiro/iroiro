import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenDetailCampaignPanel, {
  TokenDetailCampaignPanelProps,
} from "./index";
import { audiusState, campaignDetailState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenDetailCampaignPanel",
  component: TokenDetailCampaignPanel,
} as Meta;

const Template: Story<TokenDetailCampaignPanelProps> = (args) => (
  <BrowserRouter>
    <TokenDetailCampaignPanel {...args} />
  </BrowserRouter>
);

export const IsNotStarted = Template.bind({});
IsNotStarted.args = {
  state: {
    ...campaignDetailState,
    now: new Date(1577836800000),
  },
  audiusState,
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  state: campaignDetailState,
  audiusState: {
    ...audiusState,
    user: null,
  },
};

export const Default = Template.bind({});
Default.args = {
  state: campaignDetailState,
  audiusState,
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    ...campaignDetailState,
    isTokenRequested: true,
  },
  audiusState,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  state: {
    ...campaignDetailState,
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
  },
  audiusState,
};

export const IsNotClaimable = Template.bind({});
IsNotClaimable.args = {
  state: {
    ...campaignDetailState,
    isTokenCheckFinished: true,
    isTokenRequested: true,
    isCampaignClaimable: false,
  },
  audiusState,
};

export const IsClaimed = Template.bind({});
IsClaimed.args = {
  state: {
    ...campaignDetailState,
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
    isCampaignClaimed: true,
  },
  audiusState,
};

export const NotFound = Template.bind({});
NotFound.args = {
  state: {
    ...campaignDetailState,
    token: undefined,
    campaign: null,
    userBalance: "",
  },
  audiusState,
};
