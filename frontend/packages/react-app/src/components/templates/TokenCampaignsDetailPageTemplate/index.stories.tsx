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
import {
  TokenCampaignsDetailTemplate,
  TokenCampaignsDetailTemplateProps,
} from "./index";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { initialValue, tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Templates/TokenCampaignDetailTemplate",
  component: TokenCampaignsDetailTemplate,
} as Meta;

const Template: Story<TokenCampaignsDetailTemplateProps> = (args) => (
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
      <TokenCampaignsDetailTemplate {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const Wallet = Template.bind({});
Wallet.args = {
  state: {
    campaign: tokenInformationState.campaigns[0],
    campaignId: "",
    isCampaignClaimable: true,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorAddress: "",
    distributorType: "wallet",
    hashedUUID: "",
  },
};

export const UUID = Template.bind({});
UUID.args = {
  state: {
    campaign: tokenInformationState.campaigns[0],
    campaignId: "",
    isCampaignClaimable: true,
    isCampaignClaimed: false,
    now: new Date(1606780800000),
    distributorAddress: "",
    distributorType: "uuid",
    hashedUUID: "",
  },
};
