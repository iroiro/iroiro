/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AudiusCampaignDetailPanel, {
  AudiusCampaignDetailPanelProps,
} from "./index";
import {
  audiusState,
  campaign,
  tokenInformationState,
} from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Organisms/AudiusCampaignDetailPanel",
  component: AudiusCampaignDetailPanel,
} as Meta;

const Template: Story<AudiusCampaignDetailPanelProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <AudiusCampaignDetailPanel {...args} />
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
  },
  audiusState,
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
  },
  audiusState: {
    ...audiusState,
    user: null,
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
  },
  audiusState,
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
  },
  audiusState,
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
  },
  audiusState,
};

export const IsNotClaimable = Template.bind({});
IsNotClaimable.args = {
  state: {
    campaign: campaign,
    campaignAddress: "",
    isCampaignClaimable: false,
    isCampaignClaimed: false,
    now: new Date(1577836800000),
    distributorType: "",
    isTokenRequested: true,
    isTokenCheckFinished: true,
    isTokenApproved: true,
  },
  audiusState,
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
  },
  audiusState,
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
  },
};
