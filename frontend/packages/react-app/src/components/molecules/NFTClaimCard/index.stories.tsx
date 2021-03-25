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
import NFTClaimCard from "./index";
import { NFTClaimCardProps } from "./index";
import { campaignDetailState } from "../../../utils/mockData";

export default {
  title: "Molecules/NFTClaimCard",
  component: NFTClaimCard,
} as Meta;

const Template: Story<NFTClaimCardProps> = (args) => (
  <BrowserRouter>
    <NFTClaimCard {...args} />
  </BrowserRouter>
);

export const NotClaimable = Template.bind({});
NotClaimable.args = {
  isClaimable: false,
  isClaimed: false,
  state: campaignDetailState,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  ...NotClaimable.args,
};

export const Claimed = Template.bind({});
Claimed.args = {
  ...NotClaimable.args,
  state: {
    ...campaignDetailState,
    transactionHash: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  },
};
