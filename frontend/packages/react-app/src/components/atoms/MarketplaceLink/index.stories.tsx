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
import MarketplaceLink, { MarketplaceLinkProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/MarketplaceLink",
  component: MarketplaceLink,
} as Meta;

const Template: Story<MarketplaceLinkProps> = (args) => (
  <BrowserRouter>
    <MarketplaceLink {...args} />
  </BrowserRouter>
);

export const MainnetOpensea = Template.bind({});
MainnetOpensea.args = {
  network: "mainnet",
  market: "opensea",
  address: "0xb7c936b9a43844e4d7918fdc794c3078d432ba5a",
  campaignId: "[address]-1",
};

export const MainnetRarible = Template.bind({});
MainnetRarible.args = {
  ...MainnetOpensea.args,
  market: "rarible",
};

export const RinkebyOpensea = Template.bind({});
RinkebyOpensea.args = {
  ...MainnetOpensea.args,
  network: "rinkeby",
  address: "0xfb879fb06d3ebfa497c2897dfd17a2078b50e442",
};

export const RinkebyRarible = Template.bind({});
RinkebyRarible.args = {
  ...RinkebyOpensea.args,
  market: "rarible",
};
