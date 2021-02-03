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
import WalletCampaignDetailPanel, {
  WalletCampaignDetailPanelProps,
} from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/WalletCampaignDetailPanel",
  component: WalletCampaignDetailPanel,
} as Meta;

const Template: Story<WalletCampaignDetailPanelProps> = (args) => (
  <BrowserRouter>
    <WalletCampaignDetailPanel {...args} />
  </BrowserRouter>
);

export const IsNotStarted = Template.bind({});
IsNotStarted.args = {
  state: {
    ...tokenInformationState,
    now: new Date(1577836800000),
  },
};

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
  state: tokenInformationState,
};

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};

export const Requested = Template.bind({});
Requested.args = {
  state: {
    ...tokenInformationState,
    isTokenApproved: true,
    isTokenRequested: true,
  },
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
