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
import TokenAmount, { TokenAmountProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/TokenAmount",
  component: TokenAmount,
} as Meta;

const Template: Story<TokenAmountProps> = (args) => (
  <BrowserRouter>
    <TokenAmount {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  amount: "100",
  decimals: 6,
  symbol: "IRO",
  align: "center",
  variant: "h2",
};

export const NoSymbol = Template.bind({});
NoSymbol.args = {
  amount: "100",
  decimals: 6,
  align: "center",
  variant: "h2",
};

export const Wei = Template.bind({});
Wei.args = {
  amount: "1",
  decimals: 18,
  symbol: "IRO",
  align: "center",
  variant: "h2",
};
