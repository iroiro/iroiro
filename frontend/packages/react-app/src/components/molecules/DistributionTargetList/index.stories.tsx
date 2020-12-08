import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributionTargetList, { TargetsProps } from "./index";
import { distributionTargets } from "../../../utils/mockData";

export default {
  title: "Molecules/DistributionTargetList",
  component: DistributionTargetList,
} as Meta;

const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <DistributionTargetList {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  distributionTargets,
};

export const NoTarget = Template.bind({});
NoTarget.args = {
  distributionTargets: [],
};
