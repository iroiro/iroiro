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
  account: ethers.constants.AddressZero,
  devReceiver: devReceiverMock,
};

export const Loading = Template.bind({});
Loading.args = {};

export const Author = Template.bind({});
Author.args = {
  account: ethers.constants.AddressZero,
  devReceiver: devReceiverMock,
};
