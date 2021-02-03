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
import TokenListItem from "./index";
import { TokenListItemProps } from "./index";

export default {
  title: "Molecules/TokenListItem",
  component: TokenListItem,
} as Meta;

const Template: Story<TokenListItemProps> = (args) => (
  <BrowserRouter>
    <TokenListItem {...args} />
  </BrowserRouter>
);

export const Dashboard = Template.bind({});
Dashboard.args = {
  color: "secondary",
  name: "Sample Token",
  address: "0x",
  type: "dashboard",
};

export const Explore = Template.bind({});
Explore.args = {
  color: "primary",
  name: "Sample Token",
  address: "0x",
  type: "explore",
};
