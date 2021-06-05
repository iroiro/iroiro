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
import WithdrawRewardModal, { WithdrawRewardModalProps } from "./index";
import { ethers } from "ethers";
import { Currency } from "@usedapp/core";

export default {
  title: "Organisms/modals/WithdrawRewardModal",
  component: WithdrawRewardModal,
} as Meta;

const Template: Story<WithdrawRewardModalProps> = (args) => (
  <BrowserRouter>
    <WithdrawRewardModal {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  amountToBurn: "100.0",
  ctAllowance: undefined,
  ctBalance: ethers.utils.parseEther("100"),
  communityToken: new Currency("CryptoVizor Community", "CVZC", 18),
  open: true,
  approve: () => {
    return;
  },
  approveStatus: {
    status: "None",
  },
  withdrawReward: () => {
    return;
  },
  withdrawRewardStatus: {
    status: "None",
  },
};

export const ProcessingApprove = Template.bind({});
ProcessingApprove.args = {
  ...Default.args,
  approveStatus: {
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

export const SuccessApprove = Template.bind({});
SuccessApprove.args = {
  ...Default.args,
  ctAllowance: ethers.utils.parseEther("1.0"),
  approveStatus: {
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

export const ProcessingWithdraw = Template.bind({});
ProcessingWithdraw.args = {
  ...Default.args,
  ctAllowance: ethers.utils.parseEther("1.0"),
  withdrawRewardStatus: {
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

export const SuccessWithdraw = Template.bind({});
SuccessWithdraw.args = {
  ...Default.args,
  withdrawRewardStatus: {
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
