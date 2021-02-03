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
import SelectDistributorsPageTemplate, { Distributors } from "./index";
import { Distributor } from "../../../interfaces";
import { distributor } from "../../../utils/mockData";

export default {
  title: "Templates/SelectDistributorsPageTemplate",
  component: SelectDistributorsPageTemplate,
} as Meta;

const Template: Story<Distributors> = (args) => (
  <BrowserRouter>
    <SelectDistributorsPageTemplate {...args} />
  </BrowserRouter>
);

const distributors: Distributor[] = [distributor, distributor, distributor];

const tokenAddress = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

export const Default = Template.bind({});
Default.args = {
  distributors,
  tokenAddress,
};
