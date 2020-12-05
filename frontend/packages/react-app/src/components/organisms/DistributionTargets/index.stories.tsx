import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributionTargets, { TargetsProps } from "./index";
import { Target } from "../../../interfaces";

export default {
  title: "Organisms/DistributionTargets",
  component: DistributionTargets,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <DistributionTargets {...args} />
  </BrowserRouter>
);

const state: TargetsProps = {
  targets: [
    {
      handle: "sample user",
      wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
    },
    {
      handle: "username sample user",
      wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
    },
    {
      handle: "sample",
      wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
    },
    {
      handle: "username sample user",
      wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
    },
    {
      handle: "sample user",
      wallet: "0x4B8619890fa9C3cF11C497961eB4b970D440127F",
    },
  ],
  targetNumber: 1234567890123450,
};

export const Default = Template.bind({});
Default.args = state;
