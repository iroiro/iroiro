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
