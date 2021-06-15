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
import RescueDEVModal, { RescueDEVModalProps } from "./index";
import { BigNumber, ethers } from "ethers";

export default {
  title: "Organisms/modals/RescueDEVModal",
  component: RescueDEVModal,
} as Meta;

const Template: Story<RescueDEVModalProps> = (args) => (
  <BrowserRouter>
    <RescueDEVModal {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  contractBalance: BigNumber.from(ethers.utils.parseEther("10.00")),
  open: true,
  rescue: () => {
    return;
  },
  rescueStatus: {
    status: "None",
  },
};

export const ProcessingRescue = Template.bind({});
ProcessingRescue.args = {
  ...Default.args,
  rescueStatus: {
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

export const SuccessRescue = Template.bind({});
SuccessRescue.args = {
  ...Default.args,
  rescueStatus: {
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
