import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenClaimCard from "./index";
import { TokenClaimCardProps } from "../TokenClaimCard";

export default {
  title: "Molecules/TokenClaimCard",
  component: TokenClaimCard,
} as Meta;

const Template: Story<TokenClaimCardProps> = (args) => (
  <BrowserRouter>
    <TokenClaimCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {};
