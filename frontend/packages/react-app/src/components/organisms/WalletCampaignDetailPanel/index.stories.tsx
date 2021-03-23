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
import { campaign, tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { initialValue, tokenReducer } from "../../../reducers/tokenContext";
import { initialState } from "../../../reducers/campaignDetail";

export default {
  title: "Organisms/WalletCampaignDetailPanel",
  component: WalletCampaignDetailPanel,
} as Meta;

const Template: Story<WalletCampaignDetailPanelProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        ...initialValue,
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

export const Default = Template.bind({});
Default.args = {
  active: true,
  state: {
    ...initialState,
    campaign: campaign,
  },
};

export const IsWalletNotConnected = Template.bind({});
IsWalletNotConnected.args = {
  active: false,
  state: {
    ...initialState,
    ...Default.args,
  },
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  active: true,
  state: {
    ...initialState,
    ...Default.args,
    isCampaignClaimable: true,
  },
};

export const IsNotClaimable = Template.bind({});
IsNotClaimable.args = {
  active: true,
  state: {
    ...initialState,
    ...Default.args,
  },
};

export const IsClaimed = Template.bind({});
IsClaimed.args = {
  active: true,
  state: {
    ...initialState,
    ...Default.args,
    isCampaignClaimable: true,
    isCampaignClaimed: true,
  },
};
