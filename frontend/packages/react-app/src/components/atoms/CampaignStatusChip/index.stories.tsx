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
import CampaignStatusChip, { CampaignStatusChipProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/CampaignStatusChip",
  component: CampaignStatusChip,
} as Meta;

const Template: Story<CampaignStatusChipProps> = (args) => (
  <BrowserRouter>
    <CampaignStatusChip {...args} />
  </BrowserRouter>
);

export const Active = Template.bind({});
Active.args = {
  status: 0,
};

export const Cancelled = Template.bind({});
Cancelled.args = {
  status: 1,
};

export const Ended = Template.bind({});
Ended.args = {
  status: 2,
};
