import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AudiusCampaignDetailPanel, {
  AudiusCampaignDetailPanelProps,
} from "./index";
import { audiusState, tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/AudiusCampaignDetailPanel",
  component: AudiusCampaignDetailPanel,
} as Meta;

const Template: Story<AudiusCampaignDetailPanelProps> = (args) => (
  <BrowserRouter>
    <AudiusCampaignDetailPanel {...args} />
  </BrowserRouter>
);

export const IsNotStarted = Template.bind({});
IsNotStarted.args = {
  state: {
    ...tokenInformationState,
    now: new Date(1577836800000),
  },
  audiusState,
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  state: tokenInformationState,
  audiusState: {
    ...audiusState,
    user: null,
  },
};

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
  audiusState,
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenRequested: true,
  },
  audiusState,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
  },
  audiusState,
};

export const IsNotClaimable = Template.bind({});
IsNotClaimable.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenCheckFinished: true,
    isTokenRequested: true,
    isCampaignClaimable: false,
  },
  audiusState,
};

export const IsClaimed = Template.bind({});
IsClaimed.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
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
    ...tokenInformationState,
    token: undefined,
    campaigns: [],
    userBalance: "",
  },
  audiusState,
};
