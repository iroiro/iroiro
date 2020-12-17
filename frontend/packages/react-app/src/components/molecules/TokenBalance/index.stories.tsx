import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenBalance, { TokenInfo } from "./index";
import { tokenInfo } from "../../../utils/mockData";

export default {
  title: "Molecules/TokenBalance",
  component: TokenBalance,
} as Meta;

const Template: Story<TokenInfo> = (args) => (
  <BrowserRouter>
    <TokenBalance {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  balance: tokenInfo.balance,
  symbol: tokenInfo.token?.symbol,
  itemName: "Wallet Balance",
};
