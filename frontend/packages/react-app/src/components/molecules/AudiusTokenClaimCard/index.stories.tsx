import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AudiusTokenClaimCard from "./index";
import { AudiusTokenClaimCardProps } from "./index";
import { audiusState } from "../../../utils/mockData";

export default {
  title: "Molecules/AudiusTokenClaimCard",
  component: AudiusTokenClaimCard,
} as Meta;

const Template: Story<AudiusTokenClaimCardProps> = (args) => (
  <BrowserRouter>
    <AudiusTokenClaimCard {...args} />
  </BrowserRouter>
);

export const NotClaimable = Template.bind({});
NotClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: false,
  isClaimed: false,
  decimals: 6,
  audiusState,
};

export const IsClaimable = Template.bind({});
IsClaimable.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: false,
  decimals: 6,
  audiusState,
};

export const Claimed = Template.bind({});
Claimed.args = {
  symbol: "IRO",
  claimAmount: "100",
  isClaimable: true,
  isClaimed: true,
  decimals: 6,
  audiusState,
};
