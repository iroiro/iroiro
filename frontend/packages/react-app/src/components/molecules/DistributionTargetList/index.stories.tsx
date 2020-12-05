import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributionTargetList, { TargetsProps } from "./index";
import { Target } from "../../../interfaces";

export default {
  title: "Molecules/DistributionTargetList",
  component: DistributionTargetList,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <DistributionTargetList {...args} />
  </BrowserRouter>
);

const targets: Target[] = [
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
];

export const Default = Template.bind({});
Default.args = {
  targets,
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  targets: [],
};
