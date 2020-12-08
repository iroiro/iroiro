import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenClaimCard from "./index";
import { TokenClaimCardProps } from "./index";

export default {
  title: "Molecules/TokenClaimCard",
  component: TokenClaimCard,
} as Meta;

const Template: Story<TokenClaimCardProps> = (args) => (
  <BrowserRouter>
    <TokenClaimCard {...args} />
  </BrowserRouter>
);

export const NotClaimable = Template.bind({});
NotClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: false,
  isClaimed: false,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: false,
};

export const Claimed = Template.bind({});
Claimed.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: true,
};
