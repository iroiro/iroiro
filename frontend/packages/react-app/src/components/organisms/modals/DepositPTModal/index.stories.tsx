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
import DepositPTModal, { DepositPTModalProps } from "./index";
import { ethers } from "ethers";
import { Currency } from "@usedapp/core";

export default {
  title: "Organisms/modals/DepositPTModal",
  component: DepositPTModal,
} as Meta;

const Template: Story<DepositPTModalProps> = (args) => (
  <BrowserRouter>
    <DepositPTModal {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  amountToDeposit: "100.0",
  propertyToken: new Currency("CryptoVizor", "CVZ", 18),
  ptBalance: ethers.utils.parseEther("100.0"),
  open: true,
  depositPT: () => {
    return;
  },
  depositPTStatus: {
    status: "None",
  },
};

export const ZeroValue = Template.bind({});
ZeroValue.args = {
  ...Default.args,
  amountToDeposit: "0.0",
};

export const ProcessingDeposit = Template.bind({});
ProcessingDeposit.args = {
  ...Default.args,
  depositPTStatus: {
    status: "Mining",
    transaction: {
      hash: "0x0",
      confirmations: 0,
      from: ethers.constants.AddressZero,
      // @ts-ignore
      wait: () => {
        return;
      },
    },
  },
};

export const SuccessDeposit = Template.bind({});
SuccessDeposit.args = {
  ...Default.args,
  depositPTStatus: {
    status: "Success",
    transaction: {
      hash: "0x0",
      confirmations: 0,
      from: ethers.constants.AddressZero,
      // @ts-ignore
      wait: () => {
        return;
      },
    },
  },
};
