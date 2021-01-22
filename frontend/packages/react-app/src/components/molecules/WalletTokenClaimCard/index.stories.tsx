import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WalletTokenClaimCard from "./index";
import { WalletTokenClaimCardProps } from "./index";

export default {
  title: "Molecules/WalletTokenClaimCard",
  component: WalletTokenClaimCard,
} as Meta;

const Template: Story<WalletTokenClaimCardProps> = (args) => (
  <BrowserRouter>
    <WalletTokenClaimCard {...args} />
  </BrowserRouter>
);

export const NotClaimable = Template.bind({});
NotClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: false,
  isClaimed: false,
  decimals: 6,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: false,
  decimals: 6,
};

export const Claimed = Template.bind({});
Claimed.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: true,
  decimals: 6,
};
