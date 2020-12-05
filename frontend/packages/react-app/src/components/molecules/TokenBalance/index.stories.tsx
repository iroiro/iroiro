import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenBalance, { TokenInfo } from "./index";
import { AccountToken } from "../../../interfaces";

export default {
  title: "Molecules/TokenBalance",
  component: TokenBalance,
} as Meta;

const Template: Story<TokenInfo> = (args) => (
  <BrowserRouter>
    <TokenBalance {...args} />
  </BrowserRouter>
);

const tokenInfo: AccountToken = {
  token: {
    id: "0xD92E713d051C37EbB2561803a3b5FBAbc4962431",
    name: "TestUsdtToken",
    symbol: "TUSDT",
    decimals: 18,
  },
  balance: "8888888",
};

export const Default = Template.bind({});
Default.args = { tokenInfo };
