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
import EtherscanLink, { EtherscanLinkProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/EtherscanLink",
  component: EtherscanLink,
} as Meta;

const Template: Story<EtherscanLinkProps> = (args) => (
  <BrowserRouter>
    <EtherscanLink {...args} />
  </BrowserRouter>
);

export const User = Template.bind({});
User.args = {
  type: "user",
  addressOrTxHash: "0x0000000000000000000000000000000000000000",
  additionalTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

export const Token = Template.bind({});
Token.args = {
  type: "token",
  addressOrTxHash: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
};

export const Transaction = Template.bind({});
Transaction.args = {
  type: "tx",
  addressOrTxHash:
    "0xd07cbde817318492092cc7a27b3064a69bd893c01cb593d6029683ffd290ab3a",
};
