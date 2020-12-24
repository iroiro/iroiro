import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributionTargets, { TargetsProps } from "./index";
import { audiusState } from "../../../utils/mockData";

export default {
  title: "Organisms/DistributionTargets",
  component: DistributionTargets,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <DistributionTargets {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  audiusState,
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  audiusState: {
    ...audiusState,
    followers: [],
  },
};
