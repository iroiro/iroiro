import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WalletCampaignDetailPanel, {
  WalletCampaignDetailPanelProps,
} from "./index";
import { campaign, tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Organisms/WalletCampaignDetailPanel",
  component: WalletCampaignDetailPanel,
} as Meta;

const Template: Story<WalletCampaignDetailPanelProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <WalletCampaignDetailPanel {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const IsNotStarted = Template.bind({});
IsNotStarted.args = {
  state: {
    isTokenCheckFinished: false,
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1577836800000),
    distributorType: "",
    isTokenRequested: false,
    isTokenApproved: false,
    hashedUUID: "",
  },
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  state: {
    isTokenCheckFinished: false,
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "",
    isTokenRequested: false,
    isTokenApproved: false,
    hashedUUID: "",
  },
};

export const Default = Template.bind({});
Default.args = {
  state: {
    isTokenCheckFinished: false,
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "",
    isTokenRequested: false,
    isTokenApproved: false,
    hashedUUID: "",
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
    now: new Date(1606780800000),
    distributorType: "",
    isTokenRequested: true,
    isTokenApproved: true,
    hashedUUID: "",
  },
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  state: {
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "",
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
    isTokenApproved: true,
    hashedUUID: "",
  },
};

export const IsNotClaimable = Template.bind({});
IsNotClaimable.args = {
  state: {
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorType: "",
    isTokenCheckFinished: true,
    isTokenRequested: true,
    isTokenApproved: true,
    hashedUUID: "",
  },
};

export const IsClaimed = Template.bind({});
IsClaimed.args = {
  state: {
    campaign: campaign,
    campaignAddress: "",
    now: new Date(1606780800000),
    distributorType: "",
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
    isCampaignClaimed: true,
    isTokenApproved: true,
    hashedUUID: "",
  },
};

export const IsEnded = Template.bind({});
IsEnded.args = {
  state: {
    campaign: campaign,
    campaignAddress: "",
    now: new Date(1708780800000),
    distributorType: "",
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isCampaignClaimable: true,
    isCampaignClaimed: true,
    isTokenApproved: true,
    hashedUUID: "",
  },
};
