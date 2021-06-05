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
import DevReceiverPageTemplate, { DevReceiverPageTemplateProps } from "./index";
import { ethers } from "ethers";
import { devReceiverMock } from "../../../utils/mockData";
import { Currency } from "@usedapp/core";

export default {
  title: "Templates/DevReceiverPageTemplate",
  component: DevReceiverPageTemplate,
} as Meta;

const Template: Story<DevReceiverPageTemplateProps> = (args) => (
  <BrowserRouter>
    <DevReceiverPageTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  devReceiver: devReceiverMock,
  communityToken: new Currency("CryptoVizor Community", "CVZC", 18),
  devToken: new Currency("Dev", "DEV", 18),
  propertyToken: new Currency("CyrptoVizor", "CVZ", 18),
  approveCTStatus: {
    status: "None",
  },
  chargeRewardStatus: {
    status: "None",
  },
  depositPTStatus: {
    status: "None",
  },
  withdrawRewardStatus: {
    status: "None",
  },
  withdrawPTStatus: {
    status: "None",
  },
  withdrawDEVStatus: {
    status: "None",
  },
};

export const Loading = Template.bind({});
Loading.args = {
  communityToken: new Currency("", "", 0),
  devToken: new Currency("Dev", "DEV", 0),
  propertyToken: new Currency("", "", 0),
};

export const Author = Template.bind({});
Author.args = {
  ...Default.args,
  account: ethers.constants.AddressZero,
};

export const OpenChargeReward = Template.bind({});
OpenChargeReward.args = {
  ...Author.args,
  openChargeRewardModal: true,
};

export const OpenWithdrawReward = Template.bind({});
OpenWithdrawReward.args = {
  ...Author.args,
  openWithdrawRewardModal: true,
};

export const OpenDepositPTModal = Template.bind({});
OpenDepositPTModal.args = {
  ...Author.args,
  openDepositPTModal: true,
};

export const OpenWithdrawPTModal = Template.bind({});
OpenWithdrawPTModal.args = {
  ...Author.args,
  openWithdrawPTModal: true,
};
