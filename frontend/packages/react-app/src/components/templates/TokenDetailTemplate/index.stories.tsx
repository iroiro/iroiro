import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { TokenInformationState } from "../../../interfaces";
import TokenDetailTemplate from "./index";

export default {
  title: "Templates/TokenInformationTemplate",
  component: TokenDetailTemplate,
} as Meta;

const Template: Story<TokenInformationState> = (args) => (
  <BrowserRouter>
    <TokenDetailTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  token: {
    tokenAddress: "0xabcd....1234",
    name: "Iroiro Token",
    symbol: "IRO",
    decimals: 18,
    totalSupply: 2000000000,
  },
  campaigns: [],
  campaignInformationList: [],
  userBalance: "1234500000",
};
