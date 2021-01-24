import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenInformationBar, { TokenInformationBarProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Organisms/TokenInformationBar",
  component: TokenInformationBar,
} as Meta;

const Template: Story<TokenInformationBarProps> = (args) => (
  <BrowserRouter>
    <TokenInformationBar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  token: tokenInformationState.token,
  userAddress: tokenInformationState.userAddress,
  userBalance: tokenInformationState.userBalance,
};

export const Loading = Template.bind({});
Loading.args = {
  token: undefined,
  userAddress: tokenInformationState.userAddress,
  userBalance: tokenInformationState.userBalance,
};
